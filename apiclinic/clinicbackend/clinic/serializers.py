from django.conf import settings
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
from django.core.mail import send_mail

class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'


class SickSerializer(ModelSerializer):
    class Meta:
        model = Sick
        fields = '__all__'


class DoctorSerializer(ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class NurseSerializer(ModelSerializer):
    class Meta:
        model = Nurse
        fields = '__all__'


class PatientSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'avatar', 'job']

    id = serializers.CharField(source='user.id', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    avatar = serializers.CharField(source='user.avatar', read_only=True)


class MedicalRecordSerializer(ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = ['id', 'start_date', 'end_date', 'patient', 'sick', 'sick_name']

    sick_name = serializers.CharField(source='sick.name', read_only=True)


class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'meet_date', 'meet_time', 'expense', 'patient', 'patient_first_name', 'patient_last_name',
                  'patient_email', 'nurse', 'prescription_id']

    prescription_id = serializers.IntegerField(source='appPrescriptions.id', read_only=True)
    patient_first_name = serializers.CharField(source='patient.user.first_name', read_only=True)
    patient_last_name = serializers.CharField(source='patient.user.last_name', read_only=True)
    patient_email = serializers.CharField(source='patient.user.email', read_only=True)

    def update(self, instance, validated_data):
        appointment = Appointment.objects.get(pk=instance.id)
        meet_date = appointment.meet_date
        meet_time = appointment.meet_time
        send_mail('Xác nhận phiếu hẹn', f"hẹn gặp bạn vào lúc {meet_date} : {meet_time} tại phòng khám.",
                  settings.DEFAULT_FROM_EMAIL, [appointment.patient.user.email])
        Appointment.objects.filter(pk=instance.id).update(**validated_data)
        return appointment


class PrescriptionSerializer(ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['id', 'created_date', 'total_price',
                  'doctor', 'prescriptionDetails',
                  'appointment', 'expense', 'is_paid']

    expense = serializers.DecimalField(max_digits=7, decimal_places=1,source='appointment.expense', read_only=True)


class PrescriptionDetailSerializer(ModelSerializer):
    class Meta:
        model = PrescriptionDetail
        fields = ['id', 'quantity', 'price', 'prescription', 'medicine', 'medicine_name']

    medicine_name = serializers.CharField(source='medicine.name', read_only=True)


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class ScheduleDoctorSerializer(ModelSerializer):
    class Meta:
        model = ScheduleDoctor
        fields = '__all__'


class ScheduleNurseSerializer(ModelSerializer):
    class Meta:
        model = ScheduleNurse
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'role']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        user = User(**validated_data)
        setattr(user, 'role', 'PATIENT')
        user.set_password(validated_data['password'])
        user.save()

        patient = Patient.objects.create(
            user=user
        )
        patient.save()
        return user


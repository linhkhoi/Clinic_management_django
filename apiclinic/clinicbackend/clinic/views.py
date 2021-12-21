
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .paginator import BasePagination
from .serializers import *


class MedicineViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class SickViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Sick.objects.all()
    serializer_class = SickSerializer


class PatientViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    pagination_class = BasePagination

    def get_queryset(self):

        patients = Patient.objects.all()
        patient_name = self.request.query_params.get('name')
        if patient_name is not None:
            patients = patients.filter(patient=patient_name)
        return patients


class AppointmentViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.CreateAPIView,
                         generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    pagination_class = BasePagination

    def get_queryset(self):

        appointments = Appointment.objects.all()
        patient_id = self.request.query_params.get('patient_id')
        if patient_id is not None:
            appointments = appointments.filter(patient_id=patient_id)
        return appointments

    @action(methods=['get'], detail=False, url_path='get-app', url_name='get-app')
    def get_app(self, request):
        user = request.user
        queryset = self.filter_queryset(self.get_queryset())

        if user.role == 'PATIENT':
            queryset = queryset
        elif user.role == 'NURSE':
            queryset = queryset
        elif user.role == 'DOCTOR':
            queryset = queryset.filter(nurse__isnull=False).filter(appPrescriptions__isnull=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PrescriptionViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    pagination_class = BasePagination

    @action(methods=['post'], detail=False, url_path="add-prescription")
    def addPrescriptionItems(self, request):
        data = request.data
        prescriptionItems = data['prescriptionItems']
        if prescriptionItems and len(prescriptionItems) == 0:
            return Response({'detail': 'No Prescription Items'}, status=status.HTTP_400_BAD_REQUEST)
        else:

            # (1) Create order
            appointment = Appointment.objects.get(id=data['appointment'])
            doctor = Doctor.objects.get(user_id=data['doctor'])
            prescription = Prescription.objects.create(
                doctor=doctor,
                appointment=appointment,
                total_price=data['total_price']
            )

            for i in prescriptionItems:
                medicine = Medicine.objects.get(id=i['id'])

                item = PrescriptionDetail.objects.create(
                    prescription=prescription,
                    medicine=medicine,
                    quantity=i['qty'],
                    price=i['price'],
                )

                # (4) Update stock

                medicine.save()

            serializer = PrescriptionSerializer(prescription, many=False)
            return Response(serializer.data)


class PrescriptionDetailViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = PrescriptionDetail.objects.all()
    serializer_class = PrescriptionDetailSerializer

    def get_queryset(self):
        prescription = PrescriptionDetail.objects.all()
        pre_id = self.request.query_params.get('prescription_id')
        if pre_id is not None:
            prescription = prescription.filter(prescription=pre_id)

        return prescription


class MedicalRecordlViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView,
                            generics.RetrieveAPIView, generics.RetrieveUpdateAPIView):
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer

    def get_queryset(self):
        medical = MedicalRecord.objects.all()
        patient_id = self.request.query_params.get('patient_id')
        if patient_id is not None:
            medical = medical.filter(patient=patient_id)

        return medical


class OrderViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(methods=['post'], detail=False, url_path="add-order")
    def addOrderItems(self, request):
        data = request.data

        prescription = Prescription.objects.get(id=data['prescription'])
        nurse = Nurse.objects.get(user_id=data['nurse'])
        order = Order.objects.create(
            prescription=prescription,
            nurse=nurse,
            total_price_order=data['total_price_order']
        )

        prescription.is_paid = True
        prescription.save()

        return Response(status=status.HTTP_200_OK)


class ScheduleDoctorViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ScheduleDoctor.objects.all()
    serializer_class = ScheduleDoctorSerializer

    def get_queryset(self):
        schedule = ScheduleDoctor.objects.all()
        doc_id = self.request.query_params.get('doc_id')
        if doc_id is not None:
            schedule = schedule.filter(doctor=doc_id)

        return schedule


class ScheduleNurseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ScheduleNurse.objects.all()
    serializer_class = ScheduleNurseSerializer

    def get_queryset(self):
        schedule = ScheduleNurse.objects.all()
        doc_id = self.request.query_params.get('nurse_id')
        if doc_id is not None:
            schedule = schedule.filter(nurse=doc_id)

        return schedule


class UserViewSet(viewsets.ViewSet,
                  generics.ListAPIView,
                  generics.CreateAPIView,
                  generics.RetrieveAPIView,
                  generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    @action(methods=['get'], detail=False, url_path='current-user')
    def current_user(self, request):
        return Response(self.serializer_class(request.user).data)

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]


def index(request):
    return HttpResponse("clinic")

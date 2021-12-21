from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.CharField(max_length=255, null=True)
    role = models.CharField(max_length=255, null=True, default='PATIENT')

    def __str__(self):
        return self.last_name


class Doctor(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    salary = models.DecimalField(max_digits=10, decimal_places=1)

    def __str__(self):
        return self.user.last_name


class Nurse(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    salary = models.DecimalField(max_digits=10, decimal_places=1)
    appointments = models.ManyToManyField('Patient', related_name="nurses", through='Appointment')

    def __str__(self):
        return self.user.last_name


class Patient(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='users'
    )
    job = models.CharField(max_length=100, null=True)
    medicalRecords = models.ManyToManyField('Sick', related_name="patients", through='MedicalRecord')

    def __str__(self):
        return self.user.username


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name='appointments')
    nurse = models.ForeignKey(Nurse, on_delete=models.PROTECT, null=True)
    meet_date = models.DateField()
    meet_time = models.TimeField(null=True)
    expense = models.DecimalField(max_digits=7, decimal_places=1)


class Sick(models.Model):
    name = models.CharField(max_length=100, null=False)
    symptom = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name


class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    sick = models.ForeignKey(Sick, on_delete=models.PROTECT)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)


class Medicine(models.Model):
    name = models.CharField(max_length=100, null=False)
    image = models.CharField(max_length=255, null=True)
    manufacturing_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    sick = models.ForeignKey(Sick, related_name="medicines", on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=1)
    count_in_stock = models.IntegerField()

    def __str__(self):
        return self.name


class Prescription(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.PROTECT, related_name="appPrescriptions")
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    created_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=1)
    prescriptionDetails = models.ManyToManyField(Medicine, related_name="prescriptions", through='PrescriptionDetail')
    is_paid = models.BooleanField(default=False)


class PrescriptionDetail(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.PROTECT)
    medicine = models.ForeignKey(Medicine, on_delete=models.PROTECT)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=1)


class Order(models.Model):
    prescription = models.OneToOneField(Prescription, on_delete=models.PROTECT)
    nurse = models.ForeignKey(Nurse, on_delete=models.PROTECT, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    total_price_order = models.DecimalField(max_digits=10, decimal_places=1)


class ScheduleDoctor(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    schedule_date = models.DateTimeField(default=None)
    position = models.CharField(max_length=50)


class ScheduleNurse(models.Model):
    nurse = models.ForeignKey(Nurse, on_delete=models.PROTECT)
    schedule_date = models.DateTimeField(default=None)
    position = models.CharField(max_length=50)

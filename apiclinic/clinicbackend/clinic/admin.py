from django.contrib import admin
from django.contrib.admin import AdminSite

from .models import *
from django.utils.html import mark_safe, escape
from django.db.models import Count, Sum
from django.template.response import TemplateResponse
from django.urls import path, reverse
from django.contrib.auth.models import Permission, Group


class MedicineAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "expiry_date", "price", "count_in_stock","sick"]
    search_fields = ["name", "sick__name"]
    list_filter = ["sick__name"]
    readonly_fields = ["avatar"]

    class Media:
        css = {
            'all': ('/static/css/main.css',)
        }

    def avatar(self, medicine):
        return mark_safe(
            "<img src='/static/{img_url}' alt='{alt}' width='120' />".format(img_url=medicine.image,
                                                                             alt=medicine.name)
        )


class MedicineInline(admin.StackedInline):
    model = Medicine
    pk_name = "sick"


class SickAdmin(admin.ModelAdmin):
    inlines = (MedicineInline,)
    list_display = ["name", "symptom"]
    search_fields = ["name"]
    list_filter = ["name"]


class AppointmentsAdmin(admin.ModelAdmin):
    list_display = ["patient", "nurse", "meet_date", "meet_time", "expense"]
    search_fields = ["meet_date"]
    list_filter = ["meet_date"]


class UsersAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "avatar", "role"]
    search_fields = ["username"]
    list_filter = ["username"]


class DoctorAdmin(admin.ModelAdmin):
    list_display = ["user", "salary"]
    search_fields = ["salary"]
    list_filter = ["salary"]


class NurseAdmin(admin.ModelAdmin):
    list_display = ["user", "salary"]
    search_fields = ["salary"]
    list_filter = ["salary"]


class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ["appointment", "doctor", "created_date", "total_price", "is_paid"]
    search_fields = ["created_date"]
    list_filter = ["created_date"]


class PrescriptionDetailAdmin(admin.ModelAdmin):
    list_display = ["prescription", "medicine", "quantity", "price"]
    search_fields = ["prescription"]
    list_filter = ["prescription"]


class ScheduleDoctorAdmin(admin.ModelAdmin):
    list_display = ["doctor", "schedule_date", "position"]
    search_fields = ["schedule_date"]
    list_filter = ["schedule_date"]


class ScheduleNurseAdmin(admin.ModelAdmin):
    list_display = ["nurse", "schedule_date", "position"]
    search_fields = ["schedule_date"]
    list_filter = ["schedule_date"]


class PatientAdmin(admin.ModelAdmin):
    list_display = ["user", "job"]
    search_fields = ["job"]
    list_filter = ["job"]

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('chart/', self.chart),]
        return new_urls + urls

    def chart(self, request):
        yearChart = request.GET.get('year', '2021')

        stats = Appointment.objects.filter(meet_date__year=yearChart)
        stats = stats.all().values('meet_date__month').annotate(count=Count('id')).order_by('meet_date')
        stats = stats.order_by('meet_date__month')

        return TemplateResponse(request, 'admin/patient-stats.html', {
            'stats': stats,
            'year_chart': yearChart
        })


class OrderAdmin(admin.ModelAdmin):
    list_display = ["prescription", "nurse", "created_date", "total_price_order"]
    search_fields = ["created_date"]
    list_filter = ["created_date"]

    def get_urls(self):
        urls = super().get_urls()
        new_urls = [
            path('chart-month/', self.chartMonth),
            path('chart-quarter/', self.chartQuarter),
            path('chart-year/', self.chartYear),
        ]
        return new_urls + urls

    def chartMonth(self, request):
        yearChart = request.GET.get('year', '2021')
        monthChart = request.GET.get('month', '10')

        stats = Order.objects.filter(created_date__year=yearChart)
        stats = stats.filter(created_date__month=monthChart)
        stats = stats.all().values('created_date__day').annotate(sum=Sum('total_price_order'))
        stats = stats.order_by('created_date__day')

        return TemplateResponse(request, 'admin/order-month.html', {
            'stats': stats
        })

    def chartQuarter(self, request):
        yearChart = request.GET.get('year', '2021')
        quarterChart = request.GET.get('quarter', '4')

        stats = Order.objects.filter(created_date__year=yearChart)
        stats = stats.filter(created_date__quarter=quarterChart)
        stats = stats.all().values('created_date__month').annotate(sum=Sum('total_price_order'))
        stats = stats.order_by('created_date__month')

        return TemplateResponse(request, 'admin/order-quarter.html', {
            'stats': stats
        })

    def chartYear(self, request):
        yearChart = request.GET.get('year', '2021')

        stats = Order.objects.filter(created_date__year=yearChart)
        stats = stats.all().values('created_date__month').annotate(sum=Sum('total_price_order'))
        stats = stats.order_by('created_date__month')

        return TemplateResponse(request, 'admin/order-year.html', {
            'stats': stats
        })


class ClinicAppAdminSite(admin.AdminSite):
    site_header = 'HỆ THỐNG QUẢN LÝ PHÒNG MẠCH TƯ'

    def get_urls(self):
        return [
                   path('clinic-stats', self.clinic_stats),
                   path('patient-stats', self.patient_stats)
               ] + super().get_urls()

    def clinic_stats(self, request):
        sick_count = Sick.objects.count()
        stats = Sick.objects.annotate(medicine_count=Count('medicines')).values("id", "name", "medicine_count")

        return TemplateResponse(request, 'admin/clinic-stats.html', {
            'sick_count': sick_count,
            'stats': stats
        })

    def patient_stats(self, request):
        sick_count = Sick.objects.count()
        stats = Sick.objects.annotate(medicine_count=Count('medicines')).values("id", "name", "medicine_count")

        return TemplateResponse(request, 'admin/patient-stats.html', {
            'sick_count': sick_count,
            'stats': stats
        })



admin_site = ClinicAppAdminSite("myclinic")

admin_site.register(Group)
admin_site.register(Permission)
admin_site.register(User, UsersAdmin)
admin_site.register(Doctor, DoctorAdmin)
admin_site.register(Nurse, NurseAdmin)
admin_site.register(Patient, PatientAdmin)
admin_site.register(Sick, SickAdmin)
admin_site.register(Medicine, MedicineAdmin)
admin_site.register(Appointment, AppointmentsAdmin)
admin_site.register(Prescription, PrescriptionAdmin)
admin_site.register(PrescriptionDetail, PrescriptionDetailAdmin)
admin_site.register(Order, OrderAdmin)
admin_site.register(ScheduleDoctor, ScheduleDoctorAdmin)
admin_site.register(ScheduleNurse, ScheduleNurseAdmin)


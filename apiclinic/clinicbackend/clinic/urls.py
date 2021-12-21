from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from .admin import admin_site
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


router = DefaultRouter()
router.register('medicines', views.MedicineViewSet)
router.register('sicks', views.SickViewSet)
# router.register('doctors', views.DoctorViewSet)
# router.register('nurses', views.NurseViewSet)
router.register('patients', views.PatientViewSet)
router.register('appointments', views.AppointmentViewSet)
router.register('prescriptions', views.PrescriptionViewSet)
router.register('prescriptionDetails', views.PrescriptionDetailViewSet)
router.register('orders', views.OrderViewSet)
router.register('scheduleDoctors', views.ScheduleDoctorViewSet)
router.register('scheduleNurses', views.ScheduleNurseViewSet)
router.register('users', views.UserViewSet)
router.register('medical-record', views.MedicalRecordlViewSet)

schema_view = get_schema_view(
  openapi.Info(
    title="Clinic API",
    default_version='v1',
    description="APIs for CourseApp",
    contact=openapi.Contact(email="linhkhoi324@gmail.com"),
    license=openapi.License(name="Huỳnh Linh Khoi@2021"),
  ),
  public=True,
  permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('admin/', admin_site.urls),
    # path('doctor/add/', views.addPrescriptionItems, name='prescription-add'),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Generated by Django 3.2.6 on 2021-09-15 02:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0011_alter_appointment_patient'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='users', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]

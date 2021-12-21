# Generated by Django 3.2.5 on 2021-08-05 16:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0005_order_nurse'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clinic.patient')),
                ('sick', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='clinic.sick')),
            ],
        ),
        migrations.AddField(
            model_name='patient',
            name='medicalRecords',
            field=models.ManyToManyField(related_name='patients', through='clinic.MedicalRecord', to='clinic.Sick'),
        ),
    ]
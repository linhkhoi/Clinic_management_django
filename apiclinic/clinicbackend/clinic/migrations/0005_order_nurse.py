# Generated by Django 3.2.5 on 2021-07-31 03:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0004_alter_medicine_sick'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='nurse',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='clinic.nurse'),
        ),
    ]

# Generated by Django 3.2.6 on 2021-09-13 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0009_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='meet_date',
            field=models.DateField(),
        ),
    ]

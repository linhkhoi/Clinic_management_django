# Generated by Django 3.2.6 on 2021-09-13 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clinic', '0008_auto_20210910_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(max_length=255, null=True),
        ),
    ]

# Generated by Django 4.2.4 on 2023-09-16 06:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_project_userprofile_ticket'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='project',
            name='start_date',
        ),
    ]

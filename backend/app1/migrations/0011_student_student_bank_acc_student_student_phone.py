# Generated by Django 4.2.17 on 2025-03-19 10:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app1", "0010_student_student_class_staff_attendance"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="student_bank_acc",
            field=models.PositiveBigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="student_phone",
            field=models.PositiveBigIntegerField(blank=True, null=True),
        ),
    ]

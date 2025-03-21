# Generated by Django 4.2.17 on 2025-01-11 09:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app1", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="OTP",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reg_number", models.CharField(max_length=20, unique=True)),
                ("otp_code", models.CharField(max_length=6)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
import random
from django.utils import timezone


from .models import User
from rest_framework.views import APIView
from rest_framework import status
from .models import OTP, Student
from django.contrib.auth.hashers import make_password
from smtplib import SMTPException
from datetime import datetime
import secrets

from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("reg_number")
        password = request.data.get("password")

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            if not user.is_active:
                return Response({"error": "Account is disabled."}, status=status.HTTP_403_FORBIDDEN)
            
            # Generate tokens for the authenticated user
            login(request, user)
            refresh = RefreshToken.for_user(user)
            
            org_user = Student.objects.get(student_reg = username)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role":user.role,
                "userdetails": {
                            "id": org_user.student_name,
                            "name": org_user.student_reg,
                            "email": org_user.student_course
                            }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Register number or password."}, status=status.HTTP_401_UNAUTHORIZED)



class GenerateOTPView(APIView):
    def post(self, request):
        reg_number = request.data.get('reg_number')
        
        # Check if the student exists in the Student table
        try:
            student = Student.objects.get(student_reg=reg_number)
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the student is already registered in the User table
        if User.objects.filter(username=reg_number).exists():
            return Response({"error": "Student is already registered. OTP not sent."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a secure 6-digit OTP
        otp_code = str(secrets.randbelow(1000000)).zfill(6)

        # Save or update the OTP in the database
        OTP.objects.update_or_create(
            reg_number=reg_number,
            defaults={'otp_code': otp_code, 'created_at': timezone.now()}
        )

        # Send OTP via email
        try:
            send_mail(
                subject='Your OTP Code',
                message=f'Your OTP code is {otp_code}. It is valid for 5 minutes.',
                from_email='santhoshpubg555@gmail.com',
                recipient_list=[student.student_email],
                fail_silently=False,
            )
        except SMTPException as e:
            print("SMTPException: ", e)
            return Response({"error": "Failed to send OTP. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "OTP sent to the registered email."}, status=status.HTTP_200_OK)

class RegisterStudentView(APIView):
    def post(self, request):
        reg_number = request.data.get('reg_number')
        password = request.data.get('password')
        otp_code = request.data.get('otp')

        # Verify OTP
        otp_entry = get_object_or_404(OTP, reg_number=reg_number, otp_code=otp_code)
        if not otp_entry.is_valid():
            return Response({"error": "OTP expired or invalid."}, status=status.HTTP_400_BAD_REQUEST)

        # Get student details
        student = get_object_or_404(Student, student_reg=reg_number)

        # Create user account
        user = User.objects.create_user(
            username=student.student_reg,
            password=password,
            email=student.student_email,
            first_name=student.student_name,
            role='student'
        )

        # Delete OTP after successful registration
        otp_entry.delete()

        return Response({"message": "Registration successful."}, status=status.HTTP_201_CREATED)
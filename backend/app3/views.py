from django.shortcuts import render
from app1.models import Student, Staff, User
from rest_framework import generics,status
from rest_framework.permissions import IsAuthenticated
from . serializer import UserProfileSerializer
from django.shortcuts import get_object_or_404
# Create your views here.

class ProfileView(generics.RetrieveAPIView):    
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        print(str(self.request.user))
        
        return get_object_or_404(Student, student_reg=str(self.request.user))  # Ensure this doesn't raise DoesNotExist error

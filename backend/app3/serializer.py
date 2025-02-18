from rest_framework import serializers
from app1.models import Student


class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = "__all__"
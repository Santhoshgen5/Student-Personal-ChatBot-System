from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from app1.models import Student, Arrear

def get_arrears(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        arrears = Arrear.objects.filter(student=student)
        
        arrearsdata=[]
        for i in arrears:
            arrearsdata.append([i.subject, f"{i.semester} semester"])
        return JsonResponse({"arrears_count": arrearsdata})
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)


def get_pan(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        return JsonResponse({"pan": student.student_pan})
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)

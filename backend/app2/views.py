from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from app1.models import Student, Arrear

def get_arrears(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        arrears = Arrear.objects.filter(student=student)
        
        arrearsdata=f"Uh-oh, {student.student_name}! Looks like you’ve got some arrears "
        if len(arrears) == 0:
            return JsonResponse({"arrears": f"Wow, {student.student_name}! Your record is cleaner than a brand-new notebook—no arrears at all! 📖✨"})
        for i in arrears:
            arrearsdata+=f"{i.subject} ({i.semester}th semester), "
            
        arrearsdata+=". Time to clear them and become a legend! 😎📚"
        
        return JsonResponse({"arrears": arrearsdata})
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)


def get_pan(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        if (not student.student_pan):
            return JsonResponse({"pan": "Not Registered"})
            
            
        return JsonResponse({"pan": student.student_pan})
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)


def get_greet(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        return JsonResponse({"greet": f"Hi {student.student_name}! 😊 How can I assist you today?"})
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)
    
def get_number(request, username):
    try:
        student = Student.objects.get(student_reg=username)
        if (not student.student_phone):
            return JsonResponse({"mobilenum": "Not Registered"})
            
            
        return JsonResponse({"mobilenum": str(student.student_phone)})
    except Student.DoesNotExist:
        print("xdgfdgddgfdfdrtgdtr")
        return JsonResponse({"error": "Student not found"}, status=404)
    
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from datetime import timedelta


# Define possible course options
class Course(models.TextChoices):
    COMPUTER_SCIENCE = 'CS', 'Computer Science'
    INFORMATION_TECHNOLOGY = 'IT', 'Information Technology'
    ELECTRONICS = 'ECE', 'Electronics'
    MECHANICAL = 'ME', 'Mechanical'
    CIVIL = 'CE', 'Civil'

# Define possible year options
class Year(models.IntegerChoices):
    FIRST_YEAR = 1, 'First Year'
    SECOND_YEAR = 2, 'Second Year'
    THIRD_YEAR = 3, 'Third Year'
    FINAL_YEAR = 4, 'Final Year'
    
Subjects = (
    ("tamil", "Tamil"),
    ("english", "English"),
    ("maths", "Mathematics"),
    ("physics", "Physics"),
    ("chemistry", "Chemistry"),
    ("biology", "Biology"),
    ("history", "History"),
    ("geography", "Geography"),
    ("computer_science", "Computer Science"),
    ("commerce", "Commerce"),
    ("economics", "Economics"),
    ("accounting", "Accounting"),
    ("business_studies", "Business Studies"),
    ("political_science", "Political Science"),
    ("psychology", "Psychology"),
    ("sociology", "Sociology"),
    ("philosophy", "Philosophy"),
    ("statistics", "Statistics"),
    ("botany", "Botany"),
    ("zoology", "Zoology"),
    ("microbiology", "Microbiology"),
    ("biotechnology", "Biotechnology"),
    ("electronics", "Electronics"),
    ("mechanical", "Mechanical Engineering"),
    ("civil", "Civil Engineering"),
    ("electrical", "Electrical Engineering"),
    ("information_technology", "Information Technology"),
    ("management", "Management"),
    ("law", "Law"),
    ("environmental_science", "Environmental Science"),
)


# Exam Schedule model
class ExamSchedule(models.Model):
    course = models.CharField(max_length=5, choices=Course.choices)
    year = models.PositiveSmallIntegerField(choices=Year.choices)
    subject = models.CharField(max_length=100)
    exam_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.subject} on {self.exam_date} for {self.get_course_display()}"

    
class Staff(models.Model):
    staff_name = models.CharField(max_length=100)
    staff_subject = models.CharField(choices=Subjects, max_length=50)
    staff_id = models.CharField(max_length=20, unique=True)
    staff_email = models.EmailField(blank=True, null=True)
    staff_details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.staff_name

# Student model
class Student(models.Model):
    student_name = models.CharField(max_length=100)
    student_profile = models.ImageField(upload_to='students_profile', null=True, blank=True)
    student_course = models.CharField(max_length=5, choices=Course.choices, default='CS')
    student_year = models.PositiveSmallIntegerField(choices=Year.choices, default=1)
    student_reg = models.CharField(max_length=20, unique=True)
    student_phone = models.PositiveBigIntegerField(blank=True, null=True)
    student_bank_acc = models.PositiveBigIntegerField(blank=True, null=True)
    student_email = models.EmailField(blank=True, null=True)
    student_details = models.TextField(blank=True, null=True)
    student_pan = models.CharField(max_length=40,blank=True, null=True)
    student_class_staff = models.ForeignKey(Staff, on_delete=models.CASCADE, blank=True, null=True )

    def __str__(self):
        return self.student_name

class User(AbstractUser):
    ROLE_CHOICES = (
        ('hod', 'HOD'),
        ('staff', 'Staff'),
        ('student', 'Student')
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return self.username


class Arrear(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(choices=Subjects, max_length=90)
    semester = models.IntegerField(choices=[
        (1, "Semester 1"),
        (2, "Semester 2"),
        (3, "Semester 3"),
        (4, "Semester 4"),
        (5, "Semester 5"),
        (6, "Semester 6"),
        (7, "Semester 7"),  
        (8, "Semester 8")   
    ])

    def __str__(self):
        return f"{self.student} - {self.subject} - Semester {self.semester}"




class Attendance(models.Model):
    std = models.ForeignKey(Student, on_delete=models.CASCADE)
    semester = models.IntegerField(choices=[
        (1, "Semester 1"),
        (2, "Semester 2"),
        (3, "Semester 3"),
        (4, "Semester 4"),
        (5, "Semester 5"),
        (6, "Semester 6"),
        (7, "Semester 7"),  
        (8, "Semester 8")   
    ])
    percentage = models.FloatField()





class OTP(models.Model):
    reg_number = models.CharField(max_length=20, unique=True)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        """Check if the OTP is valid (within 5 minutes)."""
        return now() <= self.created_at + timedelta(minutes=5)
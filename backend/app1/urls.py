from django.urls import path
from .views import GenerateOTPView, RegisterStudentView, LoginView

urlpatterns = [
    path('generate-otp/', GenerateOTPView.as_view(), name='generate_otp'),
    path('register/', RegisterStudentView.as_view(), name='register_student'),
    path("api/login/", LoginView.as_view(), name="login"),
]

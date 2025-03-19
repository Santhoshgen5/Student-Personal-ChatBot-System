from django.urls import path
from .views import get_arrears, get_pan, get_greet, get_number

urlpatterns = [
    path('api/arrears/<str:username>/', get_arrears ),
    path('api/pan/<str:username>/', get_pan ),
    path('api/greet/<str:username>/', get_greet ),
    path('api/mobilenum/<str:username>/', get_number)
]

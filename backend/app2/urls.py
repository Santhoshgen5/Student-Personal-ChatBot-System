from django.urls import path
from .views import get_arrears, get_pan

urlpatterns = [
    path('api/arrears/<str:username>/', get_arrears ),
    path('api/pan/<str:username>/', get_pan ),
]

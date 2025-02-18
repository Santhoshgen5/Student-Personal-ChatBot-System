from django.urls import path
from .views import ProfileView

urlpatterns = [
 path("profileview/", ProfileView.as_view() )
]

from django.contrib import admin
from .models import Student, ExamSchedule, Staff,Arrear
from .forms import CustomUserForm
from .models import User
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserForm
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'role'),
        }),
    )
    
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Roles',
            {
                'fields': (
                    'role',
                ),
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)
# Register your models here.

admin.site.register(Student)
admin.site.register(ExamSchedule)
admin.site.register(Staff)
admin.site.register(Arrear)



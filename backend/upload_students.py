import pandas as pd
import os
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from app1.models import Student  # Import your model

# Load the Excel file
file_path = "students.xlsx"  # Update this with the actual file path
df = pd.read_excel(r"C:\Users\santh\AppData\Local\Microsoft\Windows\INetCache\IE\W211H01K\II_UG_CS_Registered_Student_Information_08-05-2024[1].xlsx")

# Iterate over the rows and save them to the database
for _, row in df.iterrows():
    Student.objects.update_or_create(
        student_reg=row["Registration No"],  # Assuming column name is 'register'
        student_name=row["Student Name"] # Assuming column name is 'name'
    )

print("Data uploaded successfully!")

from django.db import models
from django.contrib.auth.models import User  # Import the built-in User model

# Create your models here.
class React(models.Model):
    employee = models.CharField(max_length=30)
    department = models.CharField(max_length=200)


    

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    # Other project fields...  

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any additional fields related to the user profile if needed
    projects = models.ManyToManyField(Project)  # Many-to-Many relationship

class Ticket(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    # ForeignKey for the user who assigned the ticket
    assigner = models.ForeignKey(User, related_name='assigned_tickets', on_delete=models.SET_NULL, null=True, blank=True)
    
    # ForeignKey for the user currently assigned to work on the ticket
    assigned_user = models.ForeignKey(User, related_name='assigned_tickets_to_work_on', on_delete=models.SET_NULL, null=True, blank=True)
    
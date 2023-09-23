from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status

from .models import *
from rest_framework.response import Response
from .serializer import *
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
# class ReactView(APIView):
#     def get(self, request):
#         output = [{"employee": output.employee,
#                    "department": output.department}
#                    for output in React.objects.all()]
#         return Response(output)
    
#     def post(self, request):
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
        

# Create your views here.
# class ReactView(generics.ListCreateAPIView):
#     queryset = React.objects.all()
#     serializer_class = ReactSerializer


email = ""


@api_view(['POST'])
def Register(request):
    
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']

    User.objects.create_user(username=username, email=email, password=password)
    user = authenticate(username=username, password=password)
    login(request, user)
#new code below
    user_profile = UserProfile(user=user)
    user_profile.save()
    
    data={'message':'User Account Created'}

    return Response(data)
    # # response = HttpResponse('User Account Created')
    # # response.set_cookie('user_email', email)
    # response = HttpResponse('User Account Created')
    # response.set_cookie('user_email', email, samesite='None')

    #return response
@api_view(['POST'])
def Login(request):
    
    username = request.data['username']
    #email = request.data['email']
    password = request.data['password']

    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        data={'message':'User logged in'}
        return Response(data)
    
    data={'message':'User does not exist'}


    return Response(data)

@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def Projects(request):
    #####
    
    #####
    name = request.data['name']
    description = request.data['description']
    username = request.data['username']

    user = User.objects.get(username=username)

    try:
        user_profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        return Response({'message': 'User profile does not exist'}, status=400)
    

    project = Project(name=name, description=description)
    project.save()

    user_profile.projects.add(project)

    data={'message':'User Account Created'}

    return Response(data)



@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def Projectlist(request):
    #####
    
    #####
    
    username = request.data['username']

    user = User.objects.get(username=username)

    try:
        user_profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        return Response({'message': 'User profile does not exist'}, status=400)
    

    projects = user_profile.projects.all()

    projectsset=[]

    for i in projects:
        projectsset.append(i.name)

    #user_profile.projects.add(project)

    data={'list':projectsset}

    return Response(data)
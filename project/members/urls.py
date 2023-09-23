from django.contrib import admin
from django.urls import path

from . import views



urlpatterns = [
    path('login_user', views.login_user, name="login"),
    path('', views.home, name="home"),
    path('register_user', views.register_user, name="register_user"),



    ]

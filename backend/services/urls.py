from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet

router = DefaultRouter()
router.register(r'', ServiceViewSet, basename='service')

urlpatterns = [
    path('add-service/', ServiceViewSet.as_view({'post': 'create'}), name='service-add'),
    path('list-services/', ServiceViewSet.as_view({'get': 'list'}), name='service-list'),
    path('<int:pk>/service-details/', ServiceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='service-detail'),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet

router = DefaultRouter()

urlpatterns = [
    path('list-products/', ProductViewSet.as_view({'get': 'list'}), name='product-list'),
    path('add-new-product/', ProductViewSet.as_view({'post': 'create'}), name='product-create'),
    path('<int:pk>/product-details/', ProductViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='product-detail'),
    
    path('list-categories/', ProductCategoryViewSet.as_view({'get': 'list'}), name='category-list'),
    path('add-category/', ProductCategoryViewSet.as_view({'post': 'create'}), name='category-create'),
]

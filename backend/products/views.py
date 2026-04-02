from rest_framework import viewsets, permissions, filters
from .models import Product, ProductCategory
from .serializers import ProductSerializer, ProductCategorySerializer
from glowKGLAPI.permissions import IsOwnerOrReadOnly

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'shop_location', 'category__name']
    ordering_fields = ['price', 'final_price', 'created_at']

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)
        
        if user.role == 'client':
            user.role = 'seller'
            user.save()

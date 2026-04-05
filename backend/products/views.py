from rest_framework import viewsets, permissions, filters
from .models import Product, ProductCategory
from .serializers import ProductSerializer, ProductCategorySerializer
from glowKGLAPI.permissions import IsOwnerOrReadOnly, IsAdminRole


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_permissions(self):
        # Anyone can list/retrieve categories
        # Only admins can create, update, or delete
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminRole()]
        return [permissions.AllowAny()]


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
        # Add seller role without removing any existing roles
        user.add_role('seller')

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, ArtistAvailabilityViewSet, ArtistCategoryViewSet

router = DefaultRouter()
router.register(r'categories', ArtistCategoryViewSet, basename='artist-category')
router.register(r'availability', ArtistAvailabilityViewSet, basename='artist-availability')
router.register(r'', ArtistViewSet, basename='artist')

urlpatterns = [
    path('register-artist/', ArtistViewSet.as_view({'post': 'create'}), name='artist-register'),
    path('list-artists/', ArtistViewSet.as_view({'get': 'list'}), name='artist-list'),
    path('<int:pk>/artist-details/', ArtistViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='artist-detail'),
    path('<int:pk>/available-slots/', ArtistViewSet.as_view({'get': 'available_slots'}), name='artist-available-slots'),
    
    # Keeping categories and internal availability for now if needed, but the user didn't specify renaming them yet
    path('categories/', ArtistCategoryViewSet.as_view({'get': 'list', 'post': 'create'}), name='artist-category-list'),
    path('availability/', ArtistAvailabilityViewSet.as_view({'get': 'list', 'post': 'create'}), name='artist-availability-list'),
]

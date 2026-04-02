from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Your app URLs
    path('glowKGL/users/', include('users.urls')),
    path('glowKGL/artists/', include('artists.urls')),
    path('glowKGL/products/', include('products.urls')),
    path('glowKGL/cart/', include('cart.urls')),
    path('glowKGL/services/', include('services.urls')),
    path('glowKGL/appointments/', include('appointments.urls')),

    # Swagger / API documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc-ui'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

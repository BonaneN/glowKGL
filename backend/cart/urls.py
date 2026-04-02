from django.urls import path
from .views import CartViewSet

urlpatterns = [
    path('view-my-cart/', CartViewSet.as_view({'get': 'my_cart'}), name='cart-view'),
    path('add-item-to-cart/', CartViewSet.as_view({'post': 'add_item'}), name='cart-add'),
    path('remove-item-from-cart/', CartViewSet.as_view({'delete': 'remove_item'}), name='cart-remove'),
    path('update-item-quantity/', CartViewSet.as_view({'patch': 'update_quantity'}), name='cart-update'),
]

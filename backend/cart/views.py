from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

    @action(detail=False, methods=['get'])
    def my_cart(self, request):
        cart = self.get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = self.get_cart(request.user)
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        cart = self.get_cart(request.user)
        product_id = request.data.get('product')

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['patch'])
    def update_quantity(self, request):
        cart = self.get_cart(request.user)
        product_id = request.data.get('product')
        quantity = request.data.get('quantity')

        if quantity is None:
            return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.quantity = int(quantity)
            if cart_item.quantity <= 0:
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            cart_item.save()
            return Response(CartItemSerializer(cart_item).data)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)

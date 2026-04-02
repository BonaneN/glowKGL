from django.db import models
from django.conf import settings
from django.utils.text import slugify

class ProductCategory(models.Model):
    CATEGORY_CHOICES = [
        ("Skincare", "Skincare"),
        ("Makeup", "Makeup"),
        ("Haircare", "Haircare"),
        ("Nailcare", "Nailcare"),
        ("Wellness", "Wellness"),
        ("Fragrance", "Fragrance"),
        ("Tools & Accessories", "Tools & Accessories"),
    ]
    name = models.CharField(max_length=100, unique=True, choices=CATEGORY_CHOICES)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Product Categories"

class Product(models.Model):
    DELIVERY_OPTIONS = [
        ('Free Delivery', 'Free Delivery'),
        ('Paid Delivery', 'Paid Delivery (By Customer)'),
        ('Shop Pickup', 'Picked from the shop'),
    ]

    name = models.CharField(max_length=255)
    short_description = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    shop_location = models.CharField(max_length=255)
    delivery_option = models.CharField(max_length=20, choices=DELIVERY_OPTIONS, default='Shop Pickup')
    product_image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, related_name='products')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Calculate final price before saving
        discount_amount = (self.price * self.discount_percentage) / 100
        self.final_price = self.price - discount_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

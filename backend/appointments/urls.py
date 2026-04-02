from django.urls import path
from .views import AppointmentViewSet

urlpatterns = [
    path('my-appointments/', AppointmentViewSet.as_view({'get': 'my_appointments'}), name='my-appointments'),
    path('preview-summary/', AppointmentViewSet.as_view({'post': 'preview_summary'}), name='appointment-preview'),
    path('book-session/', AppointmentViewSet.as_view({'post': 'book_session'}), name='appointment-book'),
    path('<int:pk>/cancel-appointment/', AppointmentViewSet.as_view({'post': 'cancel_appointment'}), name='appointment-cancel'),
    path('<int:pk>/update-appointment/', AppointmentViewSet.as_view({'patch': 'update_appointment'}), name='appointment-update'),
]

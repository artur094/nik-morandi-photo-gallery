from django_filters import rest_framework as filters
from rest_framework import pagination
from rest_framework.viewsets import ReadOnlyModelViewSet

from api import serializers
from api.filters import PhotoFilter
from api.models import Photo, Category


class PhotoPagination(pagination.PageNumberPagination):
    page_size = 20


class CategoryViewSet(ReadOnlyModelViewSet):
    authentication_classes = []
    queryset = Category.objects.filter(visible=True).order_by('order', 'name')
    serializer_class = serializers.CategorySerializer


class PhotoViewSet(ReadOnlyModelViewSet):
    authentication_classes = []
    queryset = Photo.objects.filter(visible=True).order_by('-created_at')
    serializer_class = serializers.PhotoSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PhotoFilter
    pagination_class = PhotoPagination

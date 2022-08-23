from api.models import Photo
from django_filters import rest_framework as filters


class PhotoFilter(filters.FilterSet):

    class Meta:
        model = Photo
        fields = {
            "created_at": ["lte", "gte"],
            "category__name": ["iexact", "in"],
        }

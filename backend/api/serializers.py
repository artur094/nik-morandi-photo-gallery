from api import models
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ["name", "icon"]


class PhotoSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = models.Photo
        fields = [
            "photo",
            "photo_low_res",
            "thumbnail",
            "category",
            "description",
            "created_at"
        ]

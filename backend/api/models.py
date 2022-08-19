import uuid

from django.contrib.auth.models import User
from django.db import models


def get_image_path(instance, filename, directory):
    extension = filename.split('.')[-1]
    return f'images/{directory}/{str(uuid.uuid4())}.{extension}'


def get_full_res_image_path(instance, filename):
    return get_image_path(instance, filename, "full_res")


def get_low_res_image_path(instance, filename):
    return get_image_path(instance, filename, "low_res")


def get_thumbnail_image_path(instance, filename):
    return get_image_path(instance, filename, "thumbnails")


class AuditModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    class Meta:
        abstract = True


class Category(models.Model):
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=32)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorie"

    def __str__(self):
        return f"{self.name} (icon={self.icon})"


class Photo(AuditModel, models.Model):
    photo = models.ImageField(upload_to=get_full_res_image_path)
    photo_low_res = models.ImageField(upload_to=get_low_res_image_path)
    thumbnail = models.ImageField(upload_to=get_thumbnail_image_path)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = "Foto"
        verbose_name_plural = "Foto"

    def __str__(self):
        return f"Photo #{self.pk}"

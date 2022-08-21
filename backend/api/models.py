import mimetypes
import sys
import uuid
from io import BytesIO

from PIL import Image
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.db.models import Max


def get_extension(filename):
    return filename.split('.')[-1]


def get_image_path(instance, filename, directory):
    extension = get_extension(filename)
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
    icon = models.CharField(max_length=32, blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorie"

    def save(self, *args, **kwargs):
        current_max_order = Category.objects.aggregate(Max('order'))['order__max']

        if self.order is None:
            self.order = current_max_order + 1 if current_max_order is not None else 1

        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} (icon={self.icon}, order={self.order})"


class Photo(AuditModel, models.Model):
    photo = models.ImageField(upload_to=get_full_res_image_path)
    photo_low_res = models.ImageField(upload_to=get_low_res_image_path)
    thumbnail = models.ImageField(upload_to=get_thumbnail_image_path)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = "Foto"
        verbose_name_plural = "Foto"

    def save(self, *args, **kwargs):
        super(Photo, self).save(*args, **kwargs)
        self.photo_low_res = self.compress_image(self.photo, (1920, 1280), 80)
        self.thumbnail = self.compress_image(self.photo, (1280, 720), 50)
        super(Photo, self).save(*args, **kwargs)

    def compress_image(self, full_res_photo, size, quality):
        tmp_image = Image.open(full_res_photo)
        output_io_stream = BytesIO()
        tmp_resized = tmp_image.resize(size)
        tmp_resized.save(output_io_stream, format=tmp_image.format, quality=quality)
        output_io_stream.seek(0)
        compressed_image = InMemoryUploadedFile(output_io_stream,
                                                'ImageField',
                                                f"image.{get_extension(full_res_photo.name)}",
                                                mimetypes.guess_type(full_res_photo.name)[0],
                                                sys.getsizeof(output_io_stream),
                                                None)
        return compressed_image

    def __str__(self):
        return f"Photo #{self.pk} (created by {self.created_by})"

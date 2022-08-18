from django.contrib.auth.models import User
from django.db import models


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
    photo = models.ImageField()
    photo_low_res = models.ImageField()
    thumbnail = models.ImageField()
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = "Foto"
        verbose_name_plural = "Foto"

    def __str__(self):
        return f"Photo #{self.pk}"

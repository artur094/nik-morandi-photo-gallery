from django.contrib import admin

# Register your models here.
from api import models


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    fields = ('name', 'icon', 'order')
    ordering = ('order', 'name')


@admin.register(models.Photo)
class PhotoAdmin(admin.ModelAdmin):
    fields = ('photo', 'category')

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super().save_model(request, obj, form, change)

from django.contrib import admin

# Register your models here.
from api import models


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'icon', 'order', 'visible']
    list_editable = ['name', 'icon', 'order', 'visible']
    fields = ('name', 'icon', 'order', 'visible')
    ordering = ('order', 'name')
    list_display_links = ('pk',)


@admin.register(models.Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['pk', 'photo', 'category', 'visible', 'description']
    list_editable = ['photo', 'category', 'visible', 'description']
    fields = ('photo', 'category', 'visible', 'description')
    list_display_links = ('pk',)
    change_list_template = 'admin/photos_change_list.html'

    def save_model(self, request, obj, form, change):
        if obj.pk is None:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

from django import forms

from api import models


class PhotosImportForm(forms.Form):
    category = forms.ModelChoiceField(queryset=models.Category.objects.all())
    photos = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple': True}))

    def save(self, photos, owner):
        category = self.cleaned_data.get('category')
        for photo in photos:
            models.Photo(category=category, photo=photo, created_by=owner).save()

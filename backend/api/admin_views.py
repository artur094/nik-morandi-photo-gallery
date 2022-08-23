from braces.views import SuperuserRequiredMixin
from django.views.generic import FormView

from api import forms


class ImportPhotosAdminView(SuperuserRequiredMixin, FormView):
    form_class = forms.PhotosImportForm
    template_name = 'admin/import_photos.html'
    success_url = '/admin/api/photo/'

    def form_valid(self, form):
        form.save(self.request.FILES.getlist('photos'), self.request.user)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Manually plugging in context variables needed
        # to display necessary links and blocks in the
        # django admin.
        context['title'] = 'Import photos'
        context['site_header'] = 'NicolaMorandi DjangoAdmin'
        context['has_permission'] = True

        return context

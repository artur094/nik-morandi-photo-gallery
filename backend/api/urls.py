from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from rest_framework import routers

from api import views
from api.admin_views import ImportPhotosAdminView

router = routers.SimpleRouter()
router.register(r"photos", views.PhotoViewSet, basename="Photos")
router.register(r"categories", views.CategoryViewSet, basename="Categories")


urlpatterns = [
    path("", include(router.urls)),
    path("admin/photos/import", ImportPhotosAdminView.as_view(), name="import_photos"),
]

urlpatterns.extend(
    [
        # YOUR PATTERNS
        path("schema/", SpectacularAPIView.as_view(), name="schema"),
        # Optional UI:
        path(
            "schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
        path(
            "schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),
    ]
)

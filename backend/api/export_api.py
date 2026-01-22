from django.http import HttpResponse
from django.apps import apps
from django.core.serializers import serialize
from django.utils.timezone import now


def export_api_db_json(request):
    """
    Export JSON (format fixtures Django) de tous les modèles de l'app 'api'.
    À appeler depuis /admin/api/export-db/
    """
    app_config = apps.get_app_config("api")

    # Récupère tous les objets de tous les modèles de l'app
    objects = []
    for model in app_config.get_models():
        objects.extend(model.objects.all())

    data = serialize("json", objects)

    filename = f"export_api_{now().strftime('%Y%m%d_%H%M%S')}.json"
    resp = HttpResponse(data, content_type="application/json; charset=utf-8")
    resp["Content-Disposition"] = f'attachment; filename="{filename}"'
    return resp

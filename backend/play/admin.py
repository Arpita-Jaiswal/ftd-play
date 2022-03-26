from django.contrib import admin
from .models import Document, Package


# Register your models here.

class PackageAdmin(admin.ModelAdmin):
    list_display = ('path', 'description', 'created_on', 'updated_on')


class DocumentAdmin(admin.ModelAdmin):
    list_display = ('path', 'content', 'package', 'created_on', 'updated_on', 'base_path')


admin.site.register(Document, DocumentAdmin)
admin.site.register(Package, PackageAdmin)

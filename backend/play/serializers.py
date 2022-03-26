from rest_framework import serializers
from .models import Package, Document


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'path', 'description', 'created_on', 'updated_on')


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'path', 'content', 'package', 'created_on', 'updated_on', 'base_path')

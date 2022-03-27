from rest_framework import serializers
from .models import Package, Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'path', 'content', 'package', 'created_on', 'updated_on', 'base_path')


class PackageSerializer(serializers.ModelSerializer):
    all_documents = DocumentSerializer(source='documents', many=True)

    class Meta:
        model = Package
        fields = ('id', 'path', 'description', 'created_on', 'updated_on', 'all_documents')


class PackagePutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'path', 'description', 'created_on', 'updated_on')

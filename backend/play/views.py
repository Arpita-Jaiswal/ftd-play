from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DocumentSerializer, PackageSerializer
from .models import Document, Package


# Create your views here.

class DocumentView(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()


class PackageView(viewsets.ModelViewSet):
    serializer_class = PackageSerializer
    queryset = Package.objects.all()


def detail_view(_request, package_id, document_id):
    from utils.build import ftd_build
    from django.http import HttpResponse
    import os

    package = Package.objects.get(path=package_id)
    path = "sample/" + package_id
    if not os.path.exists(path):
        os.makedirs(path)

    for doc in package.documents.all():
        f = open(path + "/" + doc.path, "w")
        f.write(doc.content)
        f.close()

    ftd_build(path)

    doc_id = path + "/.build/"
    if document_id == "index.ftd":
        doc_id += "index.html"
    else:
        doc_id += document_id.replace(".ftd", "/index.html")

    f = open(doc_id)
    return HttpResponse(f.read(), content_type="text/html")


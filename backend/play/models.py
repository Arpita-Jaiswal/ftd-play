from django.db import models
import django.contrib.postgres.fields as pg


# Create your models here.

class Package(models.Model):
    path = pg.CITextField(unique=True, db_index=True)
    description = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.path


class Document(models.Model):
    path = pg.CITextField(db_index=True)
    content = models.TextField()
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='documents')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    base_path = models.TextField(db_index=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=("base_path", "path", "package"),
                name="content_path_base_path_unique",
            ),
        ]

    def __str__(self):
        return self.path

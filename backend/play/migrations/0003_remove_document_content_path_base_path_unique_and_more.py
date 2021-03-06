# Generated by Django 4.0.3 on 2022-03-27 11:21

import django.contrib.postgres.fields.citext
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0002_alter_document_package'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='document',
            name='content_path_base_path_unique',
        ),
        migrations.AlterField(
            model_name='document',
            name='path',
            field=django.contrib.postgres.fields.citext.CITextField(db_index=True),
        ),
        migrations.AddConstraint(
            model_name='document',
            constraint=models.UniqueConstraint(fields=('base_path', 'path', 'package'), name='content_path_base_path_unique'),
        ),
    ]

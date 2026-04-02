from django.db import migrations

def populate_categories(apps, schema_editor):
    ArtistCategory = apps.get_model('artists', 'ArtistCategory')
    # Choices from the model logic
    categories = [
        "Makeup",
        "Hair",
        "Nails",
        "Spa & Massage",
        "Skincare",
        "Henna",
        "Barber",
        "Lashes & Brows"
    ]
    for name in categories:
        slug = name.lower().replace(' ', '-')
        ArtistCategory.objects.get_or_create(name=name, defaults={'slug': slug})

def remove_categories(apps, schema_editor):
    ArtistCategory = apps.get_model('artists', 'ArtistCategory')
    ArtistCategory.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0002_alter_artistcategory_name'),
    ]

    operations = [
        migrations.RunPython(populate_categories, remove_categories),
    ]

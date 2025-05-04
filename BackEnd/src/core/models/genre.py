from django.db import models
from django.core.validators import FileExtensionValidator

class Genre(models.Model):
    name = models.CharField(max_length=150, unique=True)


    class Meta:
        db_table = 'genre'
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

    def __str__(self):
        return self.name

    @classmethod
    def create_genre(cls, name):
        genre = cls(
            name=name,

        )
        genre.save()
        return genre
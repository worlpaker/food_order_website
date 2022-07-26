from django.db import models


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class RestaurantCategory(BaseModel):
    name = models.CharField(max_length=64, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Restaurant(BaseModel):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(RestaurantCategory, on_delete=models.PROTECT)
    restaurant_image = models.ImageField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    res_adress = models.CharField(null=True, blank=True, max_length=250)

    def __str__(self) -> str:
        return self.name


class Food(BaseModel):
    food_name = models.CharField(max_length=128)
    food_restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    food_image = models.ImageField(
        null=True, blank=True, upload_to='food_images')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    food_is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.food_name

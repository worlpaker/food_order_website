import uuid

from django.db import models

from restaurants.models import Restaurant, Food
from accounts.models import User


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Orders(BaseModel):
    class OrderStatus(models.TextChoices):
        CREATED = "CREATED"
        WAITING = "WAITING"
        ACCEPTED = "ACCEPTED"
        COMPLETED = "COMPLETED"
        REJECTED = "REJECTED"

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    food_restaurant_order = models.ForeignKey(
        Restaurant, on_delete=models.PROTECT)
    food_name_order = models.ForeignKey(Food, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    status = models.CharField(
        max_length=64, choices=OrderStatus.choices, default=OrderStatus.CREATED, db_index=True)
    order_id = models.CharField(max_length=128, blank=True)

    class Meta:
        verbose_name = "Food Order"
        verbose_name_plural = "Food Orders"
        ordering = ['-created_date']

    def __str__(self):
        return f"{self.user} - {self.food_restaurant_order} - {self.food_name_order}"

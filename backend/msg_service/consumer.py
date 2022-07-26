import json
from kafka import KafkaConsumer
from orders.models import Orders
from accounts.models import User

# email
from django.conf import settings
from django.core.mail import EmailMessage


# Only handle single last process for tests.
# This is not the proper way to use Kafka.
# More efficient way is, Keep producer & consumer open separately from Django.
# More details: https://kafka-python.readthedocs.io/en/master/


class Order_consumer:
    '''
     #to send email
    def order_accepted(user,order_id,food_restaurant,food_name,quantity):
          email_subject = f"Order - {order_id}"
          email_body = f"Order Accepted: {food_restaurant} - {food_name} - {quantity} "
          email = EmailMessage(
              subject=email_subject,
              body=email_body,
              from_email=settings.EMAIL_HOST_USER,
              to=[user],
          )
          email.send(fail_silently=False)
            '''
    def create_order():
        consumer = KafkaConsumer(
            'test_topic',
            group_id='Order',
            bootstrap_servers='kafka:9093',
            auto_offset_reset='earliest',
            consumer_timeout_ms=1000,
            value_deserializer=lambda v: json.loads(v.decode('utf-8'))
        )
        for message in consumer:
            print(f"@Consume - {message.value}")
            user = User.objects.get(email=message.value['user'])
            order_id = message.value['order_id']
            food_restaurant = message.value['food_restaurant']
            food_name = message.value['food_name']
            quantity = message.value['quantity']
            status = message.value['status']
            count = message.value['count']
            for i in range(count):
                try:
                    Orders.objects.create(user=user, order_id=order_id, food_restaurant_order_id=food_restaurant[
                                          i], food_name_order_id=food_name[i], quantity=quantity[i], status=status)
                    consumer.close()
                    # Order_consumer.order_accepted(user,order_id,food_restaurant,food_name,quantity) - send e-mail.
                except:
                    consumer.close()
                    raise Exception("Error, Invalid order type.")

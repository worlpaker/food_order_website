import json
from datetime import datetime
from kafka import KafkaProducer

# This is only for tests, handle one request only.
# Best way: Keep producer & consumer open.
# More details: https://kafka-python.readthedocs.io/en/master/


class Producer_service:
    def order_service(type, order):
        producer = KafkaProducer(
            bootstrap_servers='kafka:9093',
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        print(
            f"@Producer Type: {type} - Date: {datetime.now()} | Message = {order}")
        producer.send('test_topic', value=order)
        producer.flush()

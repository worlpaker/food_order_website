import psycopg2
from decouple import config

# Get and store data from postgresql server


class Sql_Data():

    conn = psycopg2.connect(
        database=config('NAME'),
        user=config('USER'),
        password=config('PASSWORD'),
        host=config('HOST'),
        port=config('PORT')
    )

    conn.autocommit = True
    cursor = conn.cursor()

    def orders():
        sql = '''SELECT * FROM orders_orders'''
        Sql_Data.cursor.execute(sql)
        orders_result = Sql_Data.cursor.fetchall()
        orders_result = [({"date": i[1], "food_name_id":i[6], "rest_id":i[7], "quantity":i[4],
                          "status":i[5], "user_id":i[8], "order_id":i[9]}) for i in orders_result]
        Sql_Data.conn.commit()
        Sql_Data.conn.rollback()
        yield orders_result

    def restaurants():
        sql = '''SELECT * FROM restaurants_restaurant'''
        Sql_Data.cursor.execute(sql)
        restaurants_result = Sql_Data.cursor.fetchall()
        restaurants_result = [
            ({"id": i[0], "name":i[3], "category_id":i[5], "address":i[7]}) for i in restaurants_result]
        Sql_Data.conn.commit()
        Sql_Data.conn.rollback()
        yield restaurants_result

    def users():
        sql = '''SELECT * FROM Accounts_user'''
        Sql_Data.cursor.execute(sql)
        users_result = Sql_Data.cursor.fetchall()
        users_result = [({"email": i[4], "first_name":i[5], "last_name":i[6],
                         "address":i[7], "city":i[8], "country":i[9]}) for i in users_result]
        Sql_Data.conn.commit()
        Sql_Data.conn.rollback()
        yield users_result

    def close_connection():
        Sql_Data.conn.close()

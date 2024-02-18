import psycopg2
from os import getenv

def connect():
    try:
        connection = psycopg2.connect(
            dbname=getenv('DB_NAME'),
            user=getenv('DB_USER'),
            password=getenv('DB_PASSWD'),
            host=getenv('DB_HOST')
        )
        print('Connected to PostgreSQL server')
        return connection
    except (psycopg2.DatabaseError, Exception) as err:
        print('Error connecting to PostgreSQL server')
        print(err)

def create_tables_if_needed(conn):
    tables = {'users', 'orders', 'items', 'farms'}
    with conn.cursor() as cur:
        try:
            cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
        except:
            raise Exception("Couldn't get existing tables")
        tablenames = {x[0] for x in cur}
        try:
            if not "users" in tablenames:
                print("Creating users table")
                cur.execute("""
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(320),
                    role CHARACTER[1]
                );
                """)
            if not "orders" in tablenames:
                print("Creating orders table")
                cur.execute("""
                CREATE TABLE orders (
                    id SERIAL PRIMARY KEY,
                    owner INTEGER REFERENCES users(id),
                    items INTEGER[]
                );
                """)
            if not "items" in tablenames:
                print("Creating items table")
                cur.execute("""
                CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                farm_id INTEGER,
                name VARCHAR(255),
                price MONEY,
                image VARCHAR(511)
                );
                """)
            if not "farms" in tablenames:
                print("Creating farms table")
                cur.execute("""
                CREATE TABLE farms (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                image VARCHAR(511),
                owner_id INTEGER REFERENCES users(id)
            );
            """)
            cur.execute("ALTER TABLE items ADD FOREIGN KEY (farm_id) REFERENCES farms(id);")

            conn.commit()
        except (psycopg2.DatabaseError, Exception) as err:
                print("Error while creating tables")
                print(err)

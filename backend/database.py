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
                    addr VARCHAR(500),
                    role CHARACTER,
                    orders INTEGER[],
                    farm_id INTEGER
                );
                """)
            if not "farms" in tablenames:
                print("Creating farms table")
                cur.execute("""
                CREATE TABLE farms (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                description VARCHAR(2000),
                image VARCHAR(511),
                owner_id INTEGER REFERENCES users(id),
                items INTEGER[],
                orders INTEGER[]
                );
                """)
            if not "items" in tablenames:
                print("Creating items table")
                cur.execute("""
                CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                farm_id INTEGER REFERENCES farms(id),
                price MONEY,
                image VARCHAR(511)
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

            conn.commit()
            #cur.execute("ALTER TABLE users ADD FOREIGN KEY (orders) REFERENCES orders(id);")
            #cur.execute("ALTER TABLE farms ADD FOREIGN KEY (items) REFERENCES items(id);")
            

        except (psycopg2.DatabaseError, Exception) as err:
                print("Error while creating tables")
                print(err)

def deletefulldb():
    conn = connect()
    with conn.cursor() as cur:
        cur.execute("DROP TABLE farms CASCADE;")
        cur.execute("DROP TABLE items CASCADE;")
        cur.execute("DROP TABLE orders CASCADE;")
        cur.execute("DROP TABLE users CASCADE;")
        conn.commit()
    conn.close()

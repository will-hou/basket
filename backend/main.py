from fastapi import FastAPI, Query, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from psycopg2 import DatabaseError

from dotenv import load_dotenv
from database import connect, create_tables_if_needed, deletefulldb

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    addr: str
    role: str # does this work?

@app.get('/getprogress')
def get_progress():
    conn = connect()
    try:
        with conn.cursor() as cur:
            cur.execute("select count(*) as num_orders from orders")
            return {'cur': cur.fetchone()[0], 'threshold': 5}
    except (DatabaseError, Exception) as err:
        print("Failed with get progress")
        print(err)
        raise HTTPException(status_code=500, detail="Failed with get progress")
    finally:
        conn.close()


@app.post('/deletefulldb')
def deletefulldb():
    deletefulldb()

@app.post('/createuser')
def createuser(user: User):
    conn = connect()
    try:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO users (email, addr, role) VALUES (%s, %s, %s);",
                        (user.email, user.addr, user.role))
            conn.commit()
        return "Success"
    except (DatabaseError, Exception) as err:
        print("Error adding user to databse")
        print(err)
        raise HTTPException(status_code=500, detail="Failed to add user to db")
    finally:
        conn.close()

class Order(BaseModel):
    item: int
    order: int
    items: str

@app.post('/addorder')
def addorder(o: Order):
    conn = connect()
    try:
        with conn.cursor as cur:
            cur.execute("INSERT INTO orders (item, owner, items) VALUES (%s, %s, {%s});", (o.item, o.order, o.items))
    except (DatabaseError, Exception) as err:
        print("Error adding order to db")
        print(err)
        raise HTTPException(status_code=500, detail="Failed to add order to db")
    conn.close()
    
    
@app.get('/addtoorder')
def addtoorder(email: str, itemid: int):
    conn = connect()
    try:
        with conn.cursor as cur:
            cur.execute("SELECT ARRAY_LENGTH(orders) FROM users WHERE email = %s", (email,))
            if cur.fetchone()[0] > 0:
                cur.execute("UPDATE order o JOIN users u ON u.orders[1] = o.id SET o.items = ARRAY_APPEND(o.items, %s) WHERE u.email = %s;", (itemid, email))
            else:
                pass
    finally:
        conn.close()

@app.get('/getuser')
def getuser(email: str = Query(...)):
    conn = connect()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, email, addr, role FROM users WHERE email = %s", (email,))
            result = {}
            item = cur.fetchone()
            if item:
                return {
                    "id": item[0],
                    "email": item[1],
                    "addr": item[2],
                    "role": item[3]
                }
            else:
                return {}
    finally:
        conn.close()

@app.get('/getorder')
def getorder(email: str = Query(...)):
    conn = connect()

    with conn.cursor() as cur:
        cur.execute("""
        select * from items where id in (
        select unnest(o.items)
        from users u JOIN orders o ON u.id = o.owner
        WHERE u.email = %s);
        """, (email,))
        result = cur.fetchall()
    conn.close()
    return result

@app.get('/listitems')
def listitems():
    conn = connect()
    with conn.cursor() as cur:
        cur.execute('SELECT i.id as item_id, i.farm_id as farm_id, i.name as item_name, i.price as item_price, i.image as item_image, f.name as farm_name, f.image as farm_image, f.owner_id as seller FROM items i LEFT JOIN farms f ON i.farm_id = f.id;')
        resultlist = []
        for item in cur:
            result = {}
            for key, val in zip(('itemId', 'farmId', 'itemName', 'itemPrice', 'itemImage', 'farmName', 'farmImage', 'seller'), item):
                result[key] = val
            resultlist.append(result)
        conn.close()
        return resultlist

class Item(BaseModel):
    name: str
    farm_id: int | None = None
    price: float
    image: str | None = None

@app.post('/createitem')
def additem(item: Item):
    conn = connect()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'INSERT INTO items (name, farm_id, price) VALUES (%s, %s, %s);',
                (item.name, item.farm_id, item.price))
            conn.commit()
        return "Success"
    except (DatabaseError, Exception) as err:
        print("Error adding item to db")
        print(err)
        raise HTTPException(status_code=500, detail="Failed to add item to db")
    finally:
        conn.close()


@app.get('/testpoint')
def root():
    return {"message": "Hello World"}

@app.get('/')
def rootindex():
    return FileResponse('../frontend/dist/index.html')

# app.mount("/", StaticFiles(directory="../frontend/dist"), name="site")

if __name__ == 'main':
    load_dotenv()
    connection = connect()
    print("Going to create tables")
    create_tables_if_needed(connection)
    connection.close()
    print("Closed sql conneciton")


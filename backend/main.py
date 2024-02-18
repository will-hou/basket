from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from dotenv import load_dotenv
from database import connect, create_tables_if_needed

app = FastAPI()

@app.get('/listitems')
def listitems():
    conn = connect()
    with conn.cursor() as cur:
        cur.execute('SELECT name, farm_id, price FROM items;')
        result = cur.fetchall()
        print(result)
        conn.close()
        return result

class Item(BaseModel):
    name: str
    farm_id: int | None = None
    price: float
    
@app.post('/createitem')
def additem(item: Item):
    conn = connect()
    with conn.cursor() as cur:
        cur.execute(
            'INSERT INTO items (name, farm_id, price) VALUES (%s, %s, %s)',
            (item.name, item.farm_id, item.price))
        conn.commit()
        conn.close()
        return "Success"
    
@app.get('/testpoint')
def root():
    return {"message": "Hello World"}

@app.get('/')
def rootindex():
    return FileResponse('../frontend/dist/index.html')

app.mount("/", StaticFiles(directory="../frontend/dist"), name="site")

if __name__ == 'main':
    load_dotenv()
    connection = connect()
    print("Going to create tables")
    create_tables_if_needed(connection)
    connection.close()
    print("Closed sql conneciton")


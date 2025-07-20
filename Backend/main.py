from fastapi import FastAPI
from api.v1.endpoints import customer
from database.session import Base, engine

print("Creating FastAPI app...")
app = FastAPI()

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

print("Including router...")
app.include_router(customer.router)
print("Router included!")

@app.get("/")
def home():
    return {"message": "API is running"}

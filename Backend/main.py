from fastapi import FastAPI
from api.v1.endpoints import customer as customer_endpoint
from api.v1.endpoints import location as location_endpoint
from api.v1.endpoints import service as service_endpoint
from models.customer import Customer
from models.location import Location
from database.base import Base
from database.session import engine

print("Creating FastAPI app...")
app = FastAPI()

# Must come after model imports
print("Registered tables:", Base.metadata.tables.keys())

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

print("Including router...")
app.include_router(customer_endpoint.router)
app.include_router(location_endpoint.router)
app.include_router(service_endpoint.router)
print("Router included!")

@app.get("/")
def home():
    return {"message": "API is running"}

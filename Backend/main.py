from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.v1.endpoints import customer as customer_endpoint
from api.v1.endpoints import location as location_endpoint
from api.v1.endpoints import service as service_endpoint
from api.v1.endpoints import billing as billing_endpoint
from api.v1.endpoints import prediction as prediction_endpoint
from database.base import Base
from database.session import engine



print("Creating FastAPI app...")
app = FastAPI()

origins = [
    "http://localhost:3001",  # Your frontend
    "http://localhost:3000",  # Next.js default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Must come after model imports
print("Registered tables:", Base.metadata.tables.keys())

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

print("Including router...")
app.include_router(customer_endpoint.router)
app.include_router(location_endpoint.router)
app.include_router(service_endpoint.router)
app.include_router(billing_endpoint.router)
app.include_router(prediction_endpoint.router)
print("Router included!")

@app.get("/")
def home():
    return {"message": "API is running"}






    
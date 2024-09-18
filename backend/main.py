from fastapi import FastAPI
from src.routes import QR_CODE
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173",  # Frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to make requests
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(QR_CODE.router, prefix="/QR", tags=["WIFI QR CODE"])

@app.get("/")
def homepage():
    return "home page"

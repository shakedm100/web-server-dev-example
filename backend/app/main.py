from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import books

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-Book Reader API",
    description="REST API for managing e-books (PDF and EPUB). Interactive docs below.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)

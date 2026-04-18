from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List

from app.config import get_settings
from app.database import get_db
from app.models import Book
from app.schemas import BookCreate, BookResponse

router = APIRouter(prefix="/books", tags=["books"])

MEDIA_TYPES = {
    "pdf": "application/pdf",
    "epub": "application/epub+zip",
}


@router.get("", response_model=List[BookResponse], summary="List all books")
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).all()


@router.get("/{book_id}", response_model=BookResponse, summary="Get a book by ID")
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.post("", response_model=BookResponse, status_code=201, summary="Add a new book")
def create_book(payload: BookCreate, db: Session = Depends(get_db)):
    settings = get_settings()
    books_root = Path(settings.books_dir).resolve()
    full_path = (books_root / payload.file_path).resolve()

    if not str(full_path).startswith(str(books_root)):
        raise HTTPException(status_code=400, detail="Invalid file path")
    if not full_path.exists():
        raise HTTPException(status_code=400, detail="File not found at given path")

    book = Book(**payload.model_dump())
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


@router.get("/{book_id}/file", summary="Download a book file")
def get_book_file(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    settings = get_settings()
    books_root = Path(settings.books_dir).resolve()
    full_path = (books_root / book.file_path).resolve()

    # Prevent path traversal: ensure the resolved path stays inside books_dir
    if not str(full_path).startswith(str(books_root)):
        raise HTTPException(status_code=400, detail="Invalid file path")

    if not full_path.exists():
        raise HTTPException(status_code=404, detail="File not found on disk")

    media_type = MEDIA_TYPES.get(book.file_type.value, "application/octet-stream")
    return FileResponse(path=str(full_path), media_type=media_type, filename=full_path.name)

from sqlalchemy import Column, Integer, String, Enum
from app.database import Base
import enum


class FileType(str, enum.Enum):
    pdf = "pdf"
    epub = "epub"


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    file_type = Column(Enum(FileType), nullable=False)
    file_path = Column(String(1024), nullable=False)

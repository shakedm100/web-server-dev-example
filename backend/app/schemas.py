from pydantic import BaseModel
from app.models import FileType


class BookCreate(BaseModel):
    title: str
    file_type: FileType
    file_path: str


class BookResponse(BaseModel):
    id: int
    title: str
    file_type: FileType
    file_path: str

    model_config = {"from_attributes": True}

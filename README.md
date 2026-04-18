# E-Book Reader

A simple e-book reader with a React + TypeScript frontend and a FastAPI backend backed by a local MySQL database.

---

## Running the App

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:8000` |
| Swagger UI | `http://localhost:8000/docs` |
| ReDoc | `http://localhost:8000/redoc` |

Both services must be running for the frontend to display books.

---

## Backend

### Prerequisites

- Python 3.11+
- MySQL running locally

### Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env — set your MySQL credentials and books directory path
```

### Environment variables (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql+pymysql://root:password@127.0.0.1:3306/ebook_reader` |
| `BOOKS_DIR` | Path to the folder containing PDF/EPUB files | `../books` |

### Database

Create the database in MySQL before starting the server:

```sql
CREATE DATABASE ebook_reader;
```

The `books` table is created automatically on first startup.

### Start the server

Always run from the `backend/` directory — **do not run `python app/main.py` directly.**

```bash
cd backend
uvicorn app.main:app --reload
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/books` | Return all books |
| GET | `/books/{id}` | Return a single book by ID |
| POST | `/books` | Add a new book entry |
| GET | `/books/{id}/file` | Download the book's PDF or EPUB file |

### POST /books — request body

```json
{
  "title": "Sample PDF",
  "file_type": "pdf",
  "file_path": "sample.pdf"
}
```

`file_type` must be `"pdf"` or `"epub"`.  
`file_path` is the **filename only** — the backend resolves it against `BOOKS_DIR`.

---

## Sample Book Files

Two sample files are included in the `books/` folder at the project root:

| File | Type |
|------|------|
| `books/sample.pdf` | PDF |
| `books/sample.epub` | EPUB |

Add your own PDF/EPUB files to `books/` and register them via `POST /books`.

---

## Frontend

### Prerequisites

- Node.js 18+

### Setup

```bash
cd frontend
npm install
```

### Environment variables (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend base URL | 

The `.env` file is already created and points to `http://localhost:8000`.

### Start the dev server

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

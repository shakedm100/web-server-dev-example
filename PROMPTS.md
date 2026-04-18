# E-Book Reader — Agent-Driven Development Prompts

## What This File Is

A record of every prompt used to build this project with Claude Code,
phase by phase. Each prompt was written before any code was generated.
Read them in order to understand how agent-driven development works in
practice.

## How to Replicate This Project

1. Create an empty directory and open it in Claude Code
2. Paste the Phase 1 prompt and wait for the agent to finish
3. Verify the Definition of Done for that phase before continuing
4. Repeat for each phase in order — do not skip ahead

## Prerequisites

- Node.js 18+
- Python 3.11+
- MySQL running locally
- Claude Code

## Final Project Structure

```
web_example/
├── books/                        # PDF and EPUB files served by the API
├── backend/
│   ├── app/
│   │   ├── __init__.py           # Makes app a Python package
│   │   ├── config.py             # Pydantic Settings — single source of all env vars
│   │   ├── database.py           # SQLAlchemy engine, session factory, and Base
│   │   ├── main.py               # FastAPI app entry point and CORS middleware
│   │   ├── models.py             # SQLAlchemy ORM model for the books table
│   │   ├── schemas.py            # Pydantic schemas for request and response bodies
│   │   └── routers/
│   │       ├── __init__.py
│   │       └── books.py          # All /books endpoints (GET, POST, file serving)
│   ├── .env                      # Local credentials — never committed to git
│   ├── .env.example              # Credential template with placeholder values
│   └── requirements.txt          # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── books.ts          # All HTTP functions — no JSX, no React imports
│   │   ├── components/
│   │   │   ├── AddBookForm/      # Controlled form for registering a new book
│   │   │   ├── BookCard/         # Displays one book's title and file-type badge
│   │   │   ├── FileViewer/       # Routes between PdfViewer and iframe by file_type
│   │   │   ├── Layout/           # Page shell — header and <main> wrapper
│   │   │   └── PdfViewer/        # Renders all pages of a PDF using react-pdf
│   │   ├── hooks/
│   │   │   ├── useBook.ts        # Async state for a single book fetch
│   │   │   ├── useBooks.ts       # Async state for the book list, plus refetch
│   │   │   └── useCreateBook.ts  # Submit state for POST /books
│   │   ├── pages/
│   │   │   └── HomePage.tsx      # Composes all components — library, viewer, form
│   │   ├── types/
│   │   │   └── book.ts           # Book interface — types only, no logic
│   │   └── main.tsx              # Router setup and PDF.js worker initialization
│   ├── .env                      # VITE_API_BASE_URL — never committed to git
│   └── package.json
├── .env.example                  # Project-wide env var reference for new developers
├── .gitignore                    # Excludes .env files, node_modules, __pycache__
├── PROMPTS.md                    # Agent-driven development guide — this file
└── README.md                     # Setup and run instructions
```

## Key Principles Applied Throughout

- **One prompt per phase:** scoping prevents the agent from over-building
- **Definition of Done:** every prompt ends with verifiable acceptance
  criteria — do not move on until all criteria pass
- **Extend, never break:** each phase adds to existing contracts without
  silently changing them
- **Layers have one reason to change:** `api/`, `hooks/`, and `pages/`
  each own exactly one concern
- **Configuration lives in one place:** `.env` on the backend,
  `VITE_API_BASE_URL` on the frontend — never hardcoded anywhere

---

# Agent-Driven Development Demo — E-Book Reader

## Project Context
This project is a teaching example demonstrating agent-driven development
with Claude Code. As you work, maintain a file called `PROMPTS.md` in the
root of the project. After completing each phase, append the exact prompt
used for that phase to `PROMPTS.md` so students can read, follow along,
and replicate the process.

## Project Overview
A simple e-book reader with a React frontend, FastAPI backend, and a local
MySQL database. The app displays PDF and EPUB files. No authentication, no
user accounts, no advanced features — simplicity is the point.

## Architecture
- **Frontend:** React — displays PDF and EPUB files
- **Backend:** Python + FastAPI — serves book data via REST API
- **Database:** Local MySQL — stores book title, file type, and local file path

## Development Approach
Build in small, focused phases. Do not implement anything beyond what the
current phase asks for. When each phase is complete, confirm it works before
moving on.

---

## Phase 1 — Backend Foundation (Start Here)

Build only the following. Nothing more.

1. Initialize a FastAPI project with a clean folder structure
2. Connect to a local MySQL database using SQLAlchemy
3. Create a `books` table with the following columns:
   - `id` — integer, primary key, auto-increment
   - `title` — string, required
   - `file_type` — enum or string: `pdf` or `epub`
   - `file_path` — string, local path to the file
4. Implement three REST endpoints:
   - `GET /books` — return all books
   - `GET /books/{id}` — return a single book by ID
   - `POST /books` — add a new book entry
5. Write a short `README.md` explaining how to run the backend locally

When done, append this prompt to `PROMPTS.md` under the heading
`## Phase 1 — Backend Foundation`.

### Note — Running the Server

Always start the server with `uvicorn` from the `backend/` directory.
Do not run `python app/main.py` directly. Uvicorn puts `backend/` on
Python's path, which is required for `from app.xxx` imports to resolve.

```bash
cd backend
uvicorn app.main:app --reload
```

---

## Phase 2 — Frontend Scaffolding & Component Architecture

Build only what is listed below. Do not fetch any data, do not connect to
the backend, and do not implement any file rendering. This phase is entirely
about establishing a clean, scalable foundation.

### 1. Project Setup
- Scaffold a new React project using Vite inside a `/frontend` folder
- Use TypeScript
- Install React Router and configure it in `main.tsx`
- Create a `.env` file with a `VITE_API_BASE_URL` variable pointing to
  `http://localhost:8000` — do not use it yet, just establish the convention
- Do not install any UI component library — use plain CSS Modules only

### 2. Folder Structure
Create the following structure in full, even if files are empty stubs for now.
Every folder should have a single, obvious responsibility:

```
frontend/
├── src/
│   ├── api/          # Future home of all API call functions. Empty for now.
│   ├── components/   # Reusable, single-responsibility UI components
│   │   ├── BookCard/
│   │   │   ├── BookCard.tsx
│   │   │   └── BookCard.module.css
│   │   └── Layout/
│   │       ├── Layout.tsx
│   │       └── Layout.module.css
│   ├── pages/        # One file per route. Pages compose components.
│   │   └── HomePage.tsx
│   ├── types/        # Shared TypeScript interfaces only. No logic.
│   │   └── book.ts
│   └── main.tsx      # Entry point — router setup only, no business logic
```

### 3. TypeScript Type
Define a `Book` interface in `src/types/book.ts` that matches the backend
schema established in Phase 1:
- `id: number`
- `title: string`
- `file_type: "pdf" | "epub"`
- `file_path: string`

This file must contain only type and interface declarations — no functions,
no components, no imports from React.

### 4. Component Design Rules
Apply the following rules to every component created in this phase and all
future phases. Add these as a comment block at the top of each component
file so students can see the reasoning inline:

- **Single responsibility:** each component does exactly one thing
- **Props over state:** if data can be passed in, it should be — do not
  fetch or derive data inside a presentational component
- **No business logic in components:** calculations, formatting, and
  transformations belong in separate utility functions, not in JSX
- **Named exports only:** use `export function BookCard()`, never
  `export default` — this keeps imports explicit and searchable

### 5. Layout Component
Create `src/components/Layout/Layout.tsx`:
- Accepts a `children: React.ReactNode` prop
- Renders a consistent page shell: a header with the app name
  ("E-Book Reader") and a `<main>` element wrapping `children`
- Contains no state, no data fetching, and no conditional rendering
- All styles in `Layout.module.css`

### 6. BookCard Component
Create `src/components/BookCard/BookCard.tsx`:
- Accepts a single `book: Book` prop (imported from `src/types/book.ts`)
- Displays the book title and file type badge (`PDF` or `EPUB`)
- Is entirely presentational — no hooks, no side effects, no API calls
- All styles in `BookCard.module.css`
- The file type badge should be styled differently for PDF vs EPUB using
  CSS Modules' `composes` or a conditional class — not inline styles

### 7. Home Page
Create `src/pages/HomePage.tsx`:
- Wraps content in `<Layout>`
- Renders a hardcoded list of 2–3 mock `Book` objects using `BookCard`
- The mock data must use the real `Book` type — no `any`, no shortcuts
- This page should contain no logic beyond mapping the mock array

### 8. Routing
In `main.tsx`, configure React Router with a single route:
- `/` → `HomePage`
- Keep `main.tsx` to router configuration only — no components, no styles

### Definition of Done
- `npm run dev` starts with no TypeScript errors and no console warnings
- The home page renders the Layout shell and two or three BookCards
  populated with mock data
- Every component file has a single, clearly identifiable responsibility
- No component contains data-fetching logic, business logic, or inline styles

When done, append this prompt to `PROMPTS.md` under the heading
`## Phase 2 — Frontend Scaffolding & Component Architecture`.

---

## Phase 3 — API Layer & File Serving

This phase connects the frontend to the backend and adds the ability to
serve PDF and EPUB files from disk. Work backend-first, then frontend.
Do not implement a file viewer/reader UI yet — that is Phase 4.

---

### Backend — File Serving Endpoint

#### 1. Static Files Folder Convention
- Create a `/books` folder at the project root to store PDF and EPUB files
- Add 1–2 real PDF or EPUB sample files to `/books` for testing
- This path must be configurable via an environment variable `BOOKS_DIR`
  in a `.env` file — never hardcode the path in application code
- Load the variable using `python-dotenv` in a dedicated `config.py` file

#### 2. Config Module
Create `backend/app/config.py`:
- Uses `pydantic-settings` to define a `Settings` class with:
  - `books_dir: str` — path to the books folder
  - `database_url: str` — MySQL connection string
- Expose a single `get_settings()` function that returns a cached instance
- All other modules must import settings from here — never use
  `os.environ.get()` directly anywhere else in the codebase

#### 3. File Serving Endpoint
Add the following endpoint to the backend:

- `GET /books/{id}/file`
  - Look up the book by ID in the database
  - Verify the file exists on disk at the stored path — if not, return `404`
  - Return the file using FastAPI's `FileResponse`
  - Set the correct `media_type`:
    - `application/pdf` for PDF files
    - `application/epub+zip` for EPUB files
  - Never expose the raw filesystem path in any API response

#### 4. CORS
Ensure `CORSMiddleware` is configured in `main.py` to accept requests
from `http://localhost:5173`. If already present, verify it — do not
duplicate it.

#### 5. Backend Definition of Done
- `GET /books/{id}/file` returns the correct file for a known book ID
- Requesting a non-existent ID returns a `404` with a clear JSON message
- The books directory path is read from `.env` via `config.py` only
- No file path is exposed in any JSON response body

---

### Frontend — API Layer & Live Data

Work on this only after the backend endpoints above are verified working.

#### 6. API Layer
Create `src/api/books.ts` with two exported functions:
- `fetchBooks(): Promise<Book[]>`
  - Calls `GET /books`
  - Returns a typed array of `Book` objects
  - Throws a descriptive error if the response is not OK, including the
    HTTP status code (e.g. `"Failed to fetch books: 404"`)
- `getBookFileUrl(id: number): string`
  - Returns the full URL for `GET /books/{id}/file` — does not fetch,
    just constructs the URL for use in a future `<iframe>` or viewer
  - Reads the base URL from `import.meta.env.VITE_API_BASE_URL` only

This file must contain no JSX, no React imports, and no component logic.

#### 7. Custom Hook
Create `src/hooks/useBooks.ts`:
- Calls `fetchBooks()` on mount
- Manages and returns three explicit named states:
  - `data: Book[] | null`
  - `loading: boolean`
  - `error: string | null`
- Contains no JSX — logic only
- Add a comment explaining the separation: the `api/` layer owns the HTTP
  contract, the `hooks/` layer owns async state, the `pages/` layer owns
  rendering. Each has one reason to change.

#### 8. Update HomePage
Update `src/pages/HomePage.tsx` to replace mock data with live data:
- Call `useBooks()` and destructure `{ data, loading, error }`
- Render three distinct UI states:
  - `loading === true` → `<p>Loading books...</p>`
  - `error !== null` → `<p className={styles.error}>{error}</p>`
  - `data` is available → map over books and render a `BookCard` per book
- Remove the mock data array entirely
- The page must contain no `fetch()` calls, no `useEffect`, and no
  hardcoded URLs — all of that lives in `useBooks()` and `src/api/`

### Full Definition of Done
- The backend serves a real file at `GET /books/{id}/file`
- The frontend fetches and displays the live book list from the backend
- Stopping the backend and refreshing the frontend shows the error state
- `getBookFileUrl()` is exported and ready for use in Phase 4 — but not
  yet wired to any UI element
- No hardcoded URLs anywhere in the frontend
- No hardcoded paths anywhere in the backend
- No file system paths exposed in any API response

When done, append this prompt to `PROMPTS.md` under the heading
`## Phase 3 — API Layer & File Serving`.

---

## Phase 4 — Inline Book Viewer

Add an inline file viewer directly on the home page. Clicking a book
expands the page to show the file below the library list. Do not add any
new routes. Do not modify any backend code. This phase is about state
management, conditional rendering, and integrating a third-party library
responsibly.

### 1. Install React-PDF
Install the library and its peer dependency:

```bash
npm install react-pdf pdfjs-dist
```

In `main.tsx`, configure the PDF.js worker immediately after the import —
this must be done once, globally, before any component uses it:

```ts
import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
```

Add a comment explaining why this is in `main.tsx` and not inside a
component: the worker is a global singleton and must be initialized once
at application startup, not on every render. The URL uses `pdfjs.version`
so the worker always matches the exact version bundled by react-pdf,
preventing version-skew errors.

### 2. Extend the API Layer
Add one new function to `src/api/books.ts`:
- `fetchBook(id: number): Promise<Book>`
  - Calls `GET /books/{id}`
  - Returns a single typed `Book` object
  - Throws a descriptive error if the response is not OK
- Do not modify `fetchBooks()` or `getBookFileUrl()` — extend, never break

### 3. Custom Hook
Create `src/hooks/useBook.ts`:
- Accepts `id: number | null` as a parameter
- Does nothing and returns `{ data: null, loading: false, error: null }`
  when `id` is `null` — this handles the "no book selected" state cleanly
- Calls `fetchBook(id)` when `id` is a valid number
- Returns `{ data: Book | null, loading: boolean, error: string | null }`
- Add the same layer-separation comment used in `useBooks.ts`

### 4. PdfViewer Component
Create `src/components/PdfViewer/PdfViewer.tsx`:
- Accepts `url: string` as a prop
- Uses react-pdf's `<Document>` and `<Page>` to render the PDF
- Manages `numPages` state internally using `onDocumentLoadSuccess`
- Renders all pages in a scrollable column
- Shows a loading message while the document loads
- Shows a clear error message if the document fails to load using
  `onDocumentLoadError`
- All styles in `PdfViewer.module.css` — no inline styles
- This component handles PDF concerns only — no book metadata, no
  file type logic

### 5. FileViewer Component
Create `src/components/FileViewer/FileViewer.tsx`:
- Accepts a single `book: Book` prop
- Calls `getBookFileUrl(book.id)` to construct the file URL
- Renders differently based on `book.file_type`:
  - `"pdf"` → renders `<PdfViewer url={fileUrl} />`
  - `"epub"` → renders an `<iframe>` with `src` set to the file URL,
    plus a note: `"EPUB preview — for full reading experience, download the file"`
- The `<iframe>` must have a `title` attribute set to the book title
- All styles in `FileViewer.module.css` — no inline styles
- Pure presentational component — no hooks, no fetch calls

### 6. Update HomePage
Update `src/pages/HomePage.tsx` to manage a selected book:
- Add a `selectedId: number | null` state, initialized to `null`
- Pass `selectedId` to `useBook()` to fetch the selected book's metadata
- Update `BookCard` click handling: clicking a card sets `selectedId`
  to that book's ID; clicking the same card again sets it back to `null`
- Render the layout in two sections:
  - **Library section** — the existing list of `BookCard` components
  - **Viewer section** — rendered only when `selectedId` is not `null`:
    - Show a close button (`✕ Close`) that sets `selectedId` to `null`
    - Show loading and error states from `useBook()`
    - When `data` is available, render `<FileViewer book={data} />`

### 7. Update BookCard
Update `src/components/BookCard/BookCard.tsx`:
- Accept two new props: `onClick: () => void` and `isSelected: boolean`
- Apply a CSS module class conditionally when `isSelected` is `true`
- Do not use inline styles for the selected state

### Definition of Done
- Clicking a `BookCard` expands the viewer section below the library list
- Clicking the same card again, or the close button, collapses the viewer
- PDF files render using React-PDF with all pages visible in a scroll
- EPUB files render in an `<iframe>` with the download note below
- The selected card is visually distinguishable from unselected cards
- No PDF or EPUB rendering logic exists inside `HomePage`
- No fetch logic exists inside `FileViewer` or `PdfViewer`
- The browser console has no errors or warnings

When done, append this prompt to `PROMPTS.md` under the heading
`## Phase 4 — Inline Book Viewer`.

---

## Phase 5 — Add Book Form

Add the ability to register a new book through the UI by submitting a
form that calls the existing `POST /books` endpoint. Do not add any new
routes. Do not add any new backend endpoints. Do not modify any existing
component beyond what is explicitly listed below.

---

### Backend — Validate POST /books

The `POST /books` endpoint was created in Phase 1. Before building the
form, verify it handles bad input correctly:
- Sending an empty `title` must return `422`
- Sending a `file_type` other than `"pdf"` or `"epub"` must return `422`
- Sending a `file_path` that does not exist on disk must return `400`
  with a clear JSON message: `{ "detail": "File not found at given path" }`

If the path validation is not already in place, add it to the existing
`POST /books` handler — do not create a new file and make no other
backend changes.

---

### Frontend — Add Book Form

#### 1. Extend the API Layer
Add one new function to `src/api/books.ts`:
- `createBook(payload: Omit<Book, 'id'>): Promise<Book>`
  - Sends a `POST` request to `/books` with a JSON body
  - Returns the newly created `Book` object typed as `Book`
  - Throws a descriptive error if the response is not OK, including the
    HTTP status code and the `detail` field from the response body if
    present (e.g. `"Failed to create book: 400 — File not found at given path"`)
- Do not modify any existing function — extend, never break

#### 2. useCreateBook Hook
Create `src/hooks/useCreateBook.ts`:
- Returns `{ submit, loading, error, success }` where:
  - `submit(payload: Omit<Book, 'id'>): Promise<boolean>` calls `createBook()`
    and returns `true` on success, `false` on failure
  - `loading: boolean` is `true` while the request is in flight
  - `error: string | null` holds the error message if the request failed
  - `success: boolean` is `true` after a successful submission, then resets
    to `false` after 3 seconds automatically
- Add the same layer-separation comment used in all other hooks

#### 3. AddBookForm Component
Create `src/components/AddBookForm/AddBookForm.tsx`:
- Accepts one prop: `onSuccess: () => void`
- Renders three controlled fields: `title` (text), `file_type` (select),
  `file_path` (text with placeholder `e.g. sample.pdf`)
- Uses `useCreateBook()` internally
- Disables the submit button while `loading` is `true`
- Shows the `error` string below the form if present
- Shows "Book added successfully" when `success` is `true`
- All field values managed with individual `useState` calls
- All styles in `AddBookForm.module.css` — no inline styles
- Contains no fetch logic

#### 4. Update useBooks
Expose a `refetch` function alongside the existing return values.
`refetch` re-runs `fetchBooks()` and updates state. Use an internal
counter as the `useEffect` dependency to trigger re-fetches.

#### 5. Update HomePage
- Add a `showForm: boolean` toggle state
- Add a "＋ Add Book" / "✕ Cancel" toggle button
- When toggled open, render `<AddBookForm />` above the library list
- Pass an `onSuccess` callback that closes the form and calls `refetch()`

### Definition of Done
- Clicking "＋ Add Book" reveals the form above the library list
- Submitting with valid data adds the book and it appears immediately
- Submitting with an invalid file path shows the backend's error message
- The submit button is disabled while the request is in flight
- Clicking "✕ Cancel" hides the form
- `AddBookForm` contains no fetch logic
- `useCreateBook` contains no JSX

When done, append this prompt to `PROMPTS.md` under the heading
`## Phase 5 — Add Book Form`.

---

## Phase 6 — Code Cleanup & Project Finalization

This is the final phase. No new features, no new endpoints, no new
components. The goal is to leave the codebase in a state a new developer
could clone, read, and understand without any verbal explanation — and to
finalize PROMPTS.md as a self-contained teaching artifact.

---

### Part 1 — Code Cleanup

Audit every file in both `frontend/src` and `backend/` and apply the
following rules without exception:

#### Remove all of the following:
- `console.log`, `console.warn`, and `console.error` statements that
  were used for debugging
- Commented-out code blocks
- Any remaining `// TODO` comments
- Unused imports in every file

#### Verify the following in every component file:
- Every component has a single, identifiable responsibility
- No inline styles exist anywhere
- No hardcoded URLs exist anywhere in the frontend
- No hardcoded file paths exist anywhere in the backend

#### Verify the following across the full project:
- `npm run build` completes with zero TypeScript errors and zero warnings
- The FastAPI backend starts with no import errors or deprecation warnings
- All `.env` variables are documented in a `.env.example` file at the
  project root with placeholder values and a one-line comment explaining
  each variable — the real `.env` must be listed in `.gitignore`

---

### Part 2 — Finalize PROMPTS.md

Rewrite `PROMPTS.md` so it reads as a complete, self-contained guide.
A student who has never seen this project must be able to replicate it
from scratch using only this file and Claude Code.

### Definition of Done
- `npm run build` produces zero TypeScript errors and zero warnings
- The FastAPI backend starts cleanly with no warnings
- There are no `console.log` statements anywhere in the frontend
- There are no commented-out code blocks anywhere in the project
- There are no `// TODO` comments remaining in any file
- There are no inline styles in any component file
- `.env.example` exists at the project root with all variables documented
- `.env` is listed in `.gitignore` and is not committed
- `PROMPTS.md` is complete, accurate, and reads as a coherent guide
  from Phase 1 through Phase 6 with no gaps or forward references
- A developer with no prior context can read `PROMPTS.md` and replicate
  the entire project using only Claude Code

import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useBook } from "../hooks/useBook";
import { BookCard } from "../components/BookCard/BookCard";
import { FileViewer } from "../components/FileViewer/FileViewer";
import { AddBookForm } from "../components/AddBookForm/AddBookForm";
import { Layout } from "../components/Layout/Layout";
import styles from "./HomePage.module.css";

export function HomePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: books, loading: booksLoading, error: booksError, refetch } =
    useBooks();
  const { data: selectedBook, loading: bookLoading, error: bookError } =
    useBook(selectedId);

  function handleCardClick(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleAddSuccess() {
    setShowForm(false);
    refetch();
  }

  return (
    <Layout>
      <div className={styles.toolbar}>
        <button
          className={styles.toggleForm}
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "✕ Cancel" : "＋ Add Book"}
        </button>
      </div>

      {showForm && (
        <div className={styles.formWrapper}>
          <AddBookForm onSuccess={handleAddSuccess} />
        </div>
      )}

      <section className={styles.library}>
        {booksLoading && <p>Loading books...</p>}
        {booksError && <p className={styles.error}>{booksError}</p>}
        {books &&
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleCardClick(book.id)}
              isSelected={selectedId === book.id}
            />
          ))}
      </section>

      {selectedId !== null && (
        <section className={styles.viewer}>
          <button
            className={styles.closeButton}
            onClick={() => setSelectedId(null)}
          >
            ✕ Close
          </button>
          {bookLoading && <p>Loading book...</p>}
          {bookError && <p className={styles.error}>{bookError}</p>}
          {selectedBook && <FileViewer book={selectedBook} />}
        </section>
      )}
    </Layout>
  );
}

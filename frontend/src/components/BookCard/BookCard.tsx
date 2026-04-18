/*
 * Component design rules (applied to every component in this project):
 *
 * - Single responsibility: each component does exactly one thing
 * - Props over state: if data can be passed in, pass it in — do not
 *   fetch or derive data inside a presentational component
 * - No business logic in components: calculations, formatting, and
 *   transformations belong in separate utility functions, not in JSX
 * - Named exports only: use `export function Foo()`, never `export default`
 *   — keeps imports explicit and searchable
 */

import type { Book } from "../../types/book";
import styles from "./BookCard.module.css";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  isSelected: boolean;
}

export function BookCard({ book, onClick, isSelected }: BookCardProps) {
  const badgeClass =
    book.file_type === "pdf" ? styles.badgePdf : styles.badgeEpub;

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <span className={`${styles.badge} ${badgeClass}`}>
        {book.file_type.toUpperCase()}
      </span>
      <h2 className={styles.title}>{book.title}</h2>
    </div>
  );
}

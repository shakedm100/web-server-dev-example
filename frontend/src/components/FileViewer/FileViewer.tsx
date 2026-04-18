/*
 * Component design rules (applied to every component in this project):
 *
 * - Single responsibility: decides which viewer to render based on file_type
 * - Props over state: pure presentational component — no hooks, no fetch calls
 * - No business logic in components: routing between viewer types is its only
 *   concern
 * - Named exports only: use `export function Foo()`, never `export default`
 *   — keeps imports explicit and searchable
 */

import type { Book } from "../../types/book";
import { getBookFileUrl } from "../../api/books";
import { PdfViewer } from "../PdfViewer/PdfViewer";
import styles from "./FileViewer.module.css";

interface FileViewerProps {
  book: Book;
}

export function FileViewer({ book }: FileViewerProps) {
  const fileUrl = getBookFileUrl(book.id);

  if (book.file_type === "pdf") {
    return (
      <div className={styles.wrapper}>
        <PdfViewer url={fileUrl} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <iframe src={fileUrl} title={book.title} className={styles.epubFrame} />
      <p className={styles.epubNote}>
        EPUB preview — for full reading experience, download the file
      </p>
    </div>
  );
}

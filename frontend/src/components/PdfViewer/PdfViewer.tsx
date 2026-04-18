/*
 * Component design rules (applied to every component in this project):
 *
 * - Single responsibility: renders a PDF document only — no book metadata,
 *   no file type decisions
 * - Props over state: receives URL as prop, manages page count internally
 * - No business logic in components: no formatting, no transformations
 * - Named exports only: use `export function Foo()`, never `export default`
 *   — keeps imports explicit and searchable
 */

import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoadError(null);
  }

  function onDocumentLoadError(error: Error) {
    setLoadError("Failed to load PDF: " + error.message);
  }

  return (
    <div className={styles.container}>
      {loadError && <p className={styles.message}>{loadError}</p>}
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<p className={styles.message}>Loading document...</p>}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            className={styles.page}
            width={700}
          />
        ))}
      </Document>
    </div>
  );
}

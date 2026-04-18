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

import { useState } from "react";
import { useCreateBook } from "../../hooks/useCreateBook";
import styles from "./AddBookForm.module.css";

interface AddBookFormProps {
  onSuccess: () => void;
}

export function AddBookForm({ onSuccess }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState<"pdf" | "epub">("pdf");
  const [filePath, setFilePath] = useState("");

  const { submit, loading, error, success } = useCreateBook();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ title, file_type: fileType, file_path: filePath });
    if (ok) onSuccess();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Add a Book</h2>

      <label className={styles.label}>
        Title
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        File type
        <select
          className={styles.input}
          value={fileType}
          onChange={(e) => setFileType(e.target.value as "pdf" | "epub")}
          required
        >
          <option value="pdf">PDF</option>
          <option value="epub">EPUB</option>
        </select>
      </label>

      <label className={styles.label}>
        File path
        <input
          className={styles.input}
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="e.g. sample.pdf"
          required
        />
      </label>

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Book"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Book added successfully</p>}
    </form>
  );
}

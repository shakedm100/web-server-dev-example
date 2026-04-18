import { useState } from "react";
import type { Book } from "../types/book";
import { createBook } from "../api/books";

/*
 * Layer separation:
 *   api/   — owns the HTTP contract (URLs, fetch, status codes)
 *   hooks/ — owns async state (loading, error, data lifecycle)
 *   pages/ — owns rendering (what the user sees)
 * Each layer has exactly one reason to change.
 */

interface UseCreateBookResult {
  submit: (payload: Omit<Book, "id">) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useCreateBook(): UseCreateBookResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submit(payload: Omit<Book, "id">): Promise<boolean> {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createBook(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, success };
}

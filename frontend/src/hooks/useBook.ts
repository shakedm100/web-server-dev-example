import { useState, useEffect } from "react";
import type { Book } from "../types/book";
import { fetchBook } from "../api/books";

/*
 * Layer separation:
 *   api/   — owns the HTTP contract (URLs, fetch, status codes)
 *   hooks/ — owns async state (loading, error, data lifecycle)
 *   pages/ — owns rendering (what the user sees)
 * Each layer has exactly one reason to change.
 */

interface UseBookResult {
  data: Book | null;
  loading: boolean;
  error: string | null;
}

export function useBook(id: number | null): UseBookResult {
  const [data, setData] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetchBook(id)
      .then(setData)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unknown error")
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (id === null) return { data: null, loading: false, error: null };

  return { data, loading, error };
}

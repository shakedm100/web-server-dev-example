import { useState, useEffect } from "react";
import type { Book } from "../types/book";
import { fetchBooks } from "../api/books";

/*
 * Layer separation:
 *   api/   — owns the HTTP contract (URLs, fetch, status codes)
 *   hooks/ — owns async state (loading, error, data lifecycle)
 *   pages/ — owns rendering (what the user sees)
 * Each layer has exactly one reason to change.
 */

interface UseBooksResult {
  data: Book[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBooks(): UseBooksResult {
  const [data, setData] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchBooks()
      .then(setData)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unknown error")
      )
      .finally(() => setLoading(false));
  }, [fetchCount]);

  function refetch() {
    setFetchCount((c) => c + 1);
  }

  return { data, loading, error, refetch };
}

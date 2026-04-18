import type { Book } from "../types/book";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }
  return response.json() as Promise<Book[]>;
}

export async function fetchBook(id: number): Promise<Book> {
  const response = await fetch(`${BASE_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book: ${response.status}`);
  }
  return response.json() as Promise<Book>;
}

export async function createBook(payload: Omit<Book, "id">): Promise<Book> {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { detail?: unknown };
    let detail = "";
    if (typeof body.detail === "string") {
      detail = body.detail;
    } else if (Array.isArray(body.detail)) {
      detail = (body.detail as Array<{ msg: string }>).map((d) => d.msg).join(", ");
    }
    throw new Error(
      `Failed to create book: ${response.status}${detail ? ` — ${detail}` : ""}`
    );
  }
  return response.json() as Promise<Book>;
}

export function getBookFileUrl(id: number): string {
  return `${BASE_URL}/books/${id}/file`;
}

export interface Book {
  id: number;
  title: string;
  file_type: "pdf" | "epub";
  file_path: string;
}

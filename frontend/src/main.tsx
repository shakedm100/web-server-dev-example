import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { HomePage } from "./pages/HomePage";

// The PDF.js worker is a global singleton that must be initialized once at
// application startup. Configuring it inside a component would re-run on
// every render and could cause race conditions or duplicate worker instances.
// We derive the URL from pdfjs.version so the worker always matches the
// exact pdfjs-dist version that react-pdf bundles, preventing version skew.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
).toString();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

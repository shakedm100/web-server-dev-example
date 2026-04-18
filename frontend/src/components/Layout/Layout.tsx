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

import React from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.appName}>E-Book Reader</span>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

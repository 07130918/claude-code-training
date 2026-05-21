"use client";

import { useCallback, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

const THEME_STORAGE_KEY = "markdown-editor:theme";
const THEME_CHANGE_EVENT = "markdown-editor:theme-changed";

type Theme = "light" | "dark";

const subscribe = (callback: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
};

const getSnapshot = (): Theme => {
  const value = document.documentElement.dataset.theme;
  return value === "dark" ? "dark" : "light";
};

const getServerSnapshot = (): Theme => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, [theme]);

  const label =
    theme === "dark" ? "ライトモードに切替える" : "ダークモードに切替える";

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-label={label}
    >
      {theme === "dark" ? "ライトモード" : "ダークモード"}
    </button>
  );
}

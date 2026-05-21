// React のハイドレーション前にテーマ属性を確定させて FOUC を防ぐ
(() => {
  try {
    const stored = window.localStorage.getItem("markdown-editor:theme");
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch {
    // localStorage が使えない環境ではデフォルト (light) のままにする
  }
})();

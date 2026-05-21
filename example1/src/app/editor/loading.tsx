export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#999" }}
    >
      <span aria-hidden="true">...</span>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
        読み込み中
      </span>
    </div>
  );
}

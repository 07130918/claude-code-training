import { ForecastSkeleton } from "./_components/ForecastSkeleton";

/**
 * ルートの初回ナビゲーション時に表示されるフォールバック。
 * 子の Suspense とは独立して、ページ全体の遷移時に発火する。
 */
export default function Loading() {
	return (
		<main
			style={{
				maxWidth: 880,
				margin: "0 auto",
				padding: "48px 24px",
				display: "flex",
				flexDirection: "column",
				gap: 24,
			}}
		>
			<header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
					天気予報
				</h1>
				<p style={{ fontSize: 14, opacity: 0.7 }}>気象庁の予報データを取得中…</p>
			</header>
			<ForecastSkeleton />
		</main>
	);
}

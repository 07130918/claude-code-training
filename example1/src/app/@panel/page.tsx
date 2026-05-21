import Link from "next/link";
import { Suspense } from "react";
import { CITIES, DEFAULT_CITY_CODE, findCity } from "@/lib/cities";
import { ForecastSection } from "../_components/ForecastSection";
import { ForecastSkeleton } from "../_components/ForecastSkeleton";
import styles from "./panel.module.css";

interface Props {
	searchParams: Promise<{ city?: string; compare?: string }>;
}

/**
 * Parallel Routes の比較パネル slot。
 * - ?compare=<code> があればその都市の予報を ForecastSection で取得
 * - 未指定なら「都市を追加」UI を出す
 */
export default async function Panel({ searchParams }: Props) {
	const params = await searchParams;
	const primaryCode =
		findCity(params.city ?? "")?.code ?? DEFAULT_CITY_CODE;
	const compareCity = findCity(params.compare ?? "");

	if (!compareCity) {
		const candidates = CITIES.filter((c) => c.code !== primaryCode);
		return (
			<aside className={styles.empty}>
				<p className={styles.emptyTitle}>比較する都市を追加</p>
				<div className={styles.links}>
					{candidates.map((c) => (
						<Link
							key={c.code}
							href={`/?city=${primaryCode}&compare=${c.code}`}
							className={styles.link}
							prefetch
						>
							＋ {c.name}
						</Link>
					))}
				</div>
			</aside>
		);
	}

	return (
		<aside className={styles.panel}>
			<div className={styles.panelHeader}>
				<h2 className={styles.panelTitle}>比較: {compareCity.name}</h2>
				<Link
					href={`/?city=${primaryCode}`}
					className={styles.closeLink}
					aria-label="比較を閉じる"
				>
					✕ 閉じる
				</Link>
			</div>
			<Suspense
				key={compareCity.code}
				fallback={<ForecastSkeleton />}
			>
				<ForecastSection city={compareCity} />
			</Suspense>
		</aside>
	);
}

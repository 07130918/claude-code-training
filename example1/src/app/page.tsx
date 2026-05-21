import { Suspense } from "react";
import { DEFAULT_CITY_CODE, findCity } from "@/lib/cities";
import { CityTabs } from "./_components/CityTabs";
import { ForecastSection } from "./_components/ForecastSection";
import { ForecastSkeleton } from "./_components/ForecastSkeleton";
import styles from "./page.module.css";

interface Props {
	searchParams: Promise<{ city?: string; compare?: string }>;
}

export const revalidate = 1800;

export default async function Home({ searchParams }: Props) {
	const params = await searchParams;
	// findCity がヒットしなければデフォルト都市にフォールバック
	const city = findCity(params.city ?? "") ?? findCity(DEFAULT_CITY_CODE);
	if (!city) {
		throw new Error("default city is not registered");
	}
	const compareCity = findCity(params.compare ?? "");

	return (
		<main className={styles.main}>
			<header className={styles.header}>
				<h1 className={styles.title}>天気予報</h1>
				<p className={styles.subtitle}>気象庁の予報データ (3日間 + 週間)</p>
			</header>
			<CityTabs selected={city.code} compareCode={compareCity?.code} />
			<Suspense key={city.code} fallback={<ForecastSkeleton />}>
				<ForecastSection city={city} />
			</Suspense>
		</main>
	);
}

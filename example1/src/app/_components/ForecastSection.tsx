import {
	buildJmaForecastUrl,
	type JmaForecastResponse,
	parseJmaForecast,
} from "@/lib/jma";
import type { City } from "@/lib/types";
import { WeatherView } from "./WeatherView";

interface Props {
	city: City;
}

/**
 * 都市の予報を JMA から取得して描画する Server Component。
 * 親側で <Suspense> で囲うことで、fetch 完了までフォールバックを表示できる。
 */
export async function ForecastSection({ city }: Props) {
	const res = await fetch(buildJmaForecastUrl(city.code), {
		next: { revalidate: 1800 },
	});
	if (!res.ok) {
		throw new Error(`JMA upstream error: ${res.status}`);
	}
	const raw = (await res.json()) as JmaForecastResponse;
	const forecast = parseJmaForecast(raw, city);
	return <WeatherView forecast={forecast} />;
}

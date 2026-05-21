import type {
	City,
	ForecastDay,
	PrecipitationProbability,
	WeatherForecast,
	WeeklyForecastDay,
} from "./types";

/**
 * 気象庁 forecast JSON の最低限の型定義
 * 実際のレスポンスは項目が多いが、ここでは MVP に必要なものだけを扱う
 */
interface JmaArea {
	area: { name: string; code: string };
	weatherCodes?: string[];
	weathers?: string[];
	pops?: string[];
	temps?: string[];
	tempsMin?: string[];
	tempsMax?: string[];
	reliabilities?: string[];
}

interface JmaTimeSeries {
	timeDefines: string[];
	areas: JmaArea[];
}

interface JmaForecastBlock {
	publishingOffice: string;
	reportDatetime: string;
	timeSeries: JmaTimeSeries[];
}

export type JmaForecastResponse = JmaForecastBlock[];

const JMA_FORECAST_BASE = "https://www.jma.go.jp/bosai/forecast/data/forecast";

export function buildJmaForecastUrl(cityCode: string): string {
	return `${JMA_FORECAST_BASE}/${cityCode}.json`;
}

/**
 * 同じ日付 (YYYY-MM-DD) に丸めるためのキー
 */
function toDateKey(iso: string): string {
	return iso.slice(0, 10);
}

/**
 * 気象庁の 3 桁 weatherCode を大分類のラベルに変換する。
 * 100台=晴れ系, 200台=くもり系, 300台=雨系, 400台=雪系
 */
function summarizeWeatherCode(code: string | undefined): string {
	if (!code) return "—";
	switch (code.charAt(0)) {
		case "1":
			return "晴れ";
		case "2":
			return "くもり";
		case "3":
			return "雨";
		case "4":
			return "雪";
		default:
			return "—";
	}
}

function toNullableNumber(value: string | undefined): number | null {
	if (value === undefined || value === "") return null;
	const n = Number(value);
	return Number.isNaN(n) ? null : n;
}

/**
 * 週間予報ブロック (raw[1]) を整形する。
 * - timeSeries[0]: 天気コード + 降水確率 + 信頼度 (areaCode で引く)
 * - timeSeries[1]: 最高 / 最低気温 (tempCode で引く)
 *
 * ブロックが欠落していた場合は空配列を返す。
 */
function parseWeeklyForecast(
	block: JmaForecastBlock | undefined,
	city: City,
): WeeklyForecastDay[] {
	if (!block) return [];

	const weatherSeries = block.timeSeries[0];
	const weatherArea =
		weatherSeries?.areas.find((a) => a.area.code === city.areaCode) ??
		weatherSeries?.areas[0];
	if (!weatherSeries || !weatherArea) return [];

	const tempSeries = block.timeSeries[1];
	const tempArea =
		tempSeries?.areas.find((a) => a.area.code === city.tempCode) ??
		tempSeries?.areas[0];

	// 気温系列のタイムスタンプは天気系列とズレることがあるので index ではなく日付で引く
	const tempMinByDate = new Map<string, number>();
	const tempMaxByDate = new Map<string, number>();
	if (tempSeries && tempArea) {
		tempSeries.timeDefines.forEach((iso, idx) => {
			const key = toDateKey(iso);
			const min = toNullableNumber(tempArea.tempsMin?.[idx]);
			const max = toNullableNumber(tempArea.tempsMax?.[idx]);
			if (min !== null) tempMinByDate.set(key, min);
			if (max !== null) tempMaxByDate.set(key, max);
		});
	}

	return weatherSeries.timeDefines.map((iso, idx) => {
		const key = toDateKey(iso);
		const code = weatherArea.weatherCodes?.[idx] ?? "";
		return {
			date: iso,
			weatherCode: code,
			weatherSummary: summarizeWeatherCode(code),
			pop: toNullableNumber(weatherArea.pops?.[idx]),
			tempMin: tempMinByDate.get(key) ?? null,
			tempMax: tempMaxByDate.get(key) ?? null,
			reliability: weatherArea.reliabilities?.[idx] ?? "",
		};
	});
}

/**
 * 気象庁 JSON を MVP 用のシンプルな形に整形する
 *
 * - timeSeries[0]: 天気文（3 日分が基本）
 * - timeSeries[2]: 気温（朝最低・昼最高が日付ごとに並ぶ）
 *
 * 取れない値は null で埋め、TypeScript 側でハンドリングしやすくする。
 */
export function parseJmaForecast(
	raw: JmaForecastResponse,
	city: City,
): WeatherForecast {
	const block = raw[0];
	if (!block) {
		throw new Error("JMA forecast response is empty");
	}

	const weatherSeries = block.timeSeries[0];
	const weatherArea =
		weatherSeries?.areas.find((a) => a.area.code === city.areaCode) ??
		weatherSeries?.areas[0];

	if (!weatherSeries || !weatherArea?.weathers) {
		throw new Error("JMA forecast response missing weather data");
	}

	const tempSeries = block.timeSeries[2];
	const tempArea = tempSeries?.areas.find((a) => a.area.code === city.tempCode);

	const minByDate = new Map<string, number>();
	const maxByDate = new Map<string, number>();
	if (tempSeries && tempArea?.temps) {
		tempSeries.timeDefines.forEach((iso, idx) => {
			const tempStr = tempArea.temps?.[idx];
			if (tempStr === undefined || tempStr === "") return;
			const value = Number(tempStr);
			if (Number.isNaN(value)) return;
			const key = toDateKey(iso);
			// 気象庁データは JST 固定なので文字列スライスで時刻を扱える
			const hour = Number(iso.slice(11, 13));
			if (hour < 12) {
				if (!minByDate.has(key)) minByDate.set(key, value);
			} else {
				if (!maxByDate.has(key)) maxByDate.set(key, value);
			}
		});
	}

	const popSeries = block.timeSeries[1];
	const popArea = popSeries?.areas.find((a) => a.area.code === city.areaCode);
	const popsByDate = new Map<string, PrecipitationProbability[]>();
	if (popSeries && popArea?.pops) {
		popSeries.timeDefines.forEach((iso, idx) => {
			const popStr = popArea.pops?.[idx];
			if (popStr === undefined || popStr === "") return;
			const value = Number(popStr);
			if (Number.isNaN(value)) return;
			const key = toDateKey(iso);
			const arr = popsByDate.get(key) ?? [];
			arr.push({ time: iso, value });
			popsByDate.set(key, arr);
		});
	}

	const forecasts: ForecastDay[] = weatherSeries.timeDefines.map((iso, idx) => {
		const key = toDateKey(iso);
		return {
			date: iso,
			weather: (weatherArea.weathers?.[idx] ?? "").replace(/　/g, " "),
			tempMin: minByDate.get(key) ?? null,
			tempMax: maxByDate.get(key) ?? null,
			pops: popsByDate.get(key) ?? [],
		};
	});

	const weekly = parseWeeklyForecast(raw[1], city);

	return {
		city,
		publishingOffice: block.publishingOffice,
		reportDatetime: block.reportDatetime,
		forecasts,
		weekly,
	};
}

import type { City, CityCode } from "./types";

/**
 * プリセット5都市の定義
 *
 * - code: 気象庁の都府県コード (forecast JSON の取得先)
 * - areaCode: timeSeries[0] (天気文) で参照する地域コード
 * - tempCode: timeSeries[2] (気温) で参照する観測地点コード
 */
export const CITIES: readonly City[] = [
	{ code: "016000", name: "札幌", areaCode: "016010", tempCode: "14163" },
	{ code: "040000", name: "仙台", areaCode: "040010", tempCode: "34392" },
	{ code: "130000", name: "東京", areaCode: "130010", tempCode: "44132" },
	{ code: "270000", name: "大阪", areaCode: "270000", tempCode: "62078" },
	{ code: "400000", name: "福岡", areaCode: "400010", tempCode: "82182" },
] as const;

export const DEFAULT_CITY_CODE: CityCode = "130000";

export function findCity(code: string): City | undefined {
	return CITIES.find((c) => c.code === code);
}

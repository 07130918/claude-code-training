/**
 * API成功レスポンス
 */
export interface ApiSuccessResponse<T> {
	success: true;
	data: T;
}

/**
 * APIエラーレスポンス
 */
export interface ApiErrorResponse {
	success: false;
	error: {
		message: string;
		code?: string;
	};
}

/**
 * APIレスポンス型
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * ヘルスチェックレスポンス
 */
export interface HealthCheckResponse {
	status: "ok";
	timestamp: string;
}

/**
 * プリセット都市の都府県コード（気象庁の予報地域コード）
 */
export type CityCode = "016000" | "040000" | "130000" | "270000" | "400000";

/**
 * プリセット都市の定義
 */
export interface City {
	code: CityCode;
	name: string;
	areaCode: string;
	tempCode: string;
}

/**
 * 6時間ごとの降水確率
 */
export interface PrecipitationProbability {
	time: string;
	value: number;
}

/**
 * 1日分の予報
 */
export interface ForecastDay {
	date: string;
	weather: string;
	tempMin: number | null;
	tempMax: number | null;
	pops: PrecipitationProbability[];
}

/**
 * 週間予報 1日分
 */
export interface WeeklyForecastDay {
	date: string;
	weatherCode: string;
	weatherSummary: string;
	pop: number | null;
	tempMin: number | null;
	tempMax: number | null;
	reliability: string;
}

/**
 * 都市の天気予報レスポンス
 */
export interface WeatherForecast {
	city: City;
	publishingOffice: string;
	reportDatetime: string;
	forecasts: ForecastDay[];
	weekly: WeeklyForecastDay[];
}

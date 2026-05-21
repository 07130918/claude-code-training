import { NextResponse } from "next/server";
import { findCity } from "@/lib/cities";
import {
	buildJmaForecastUrl,
	type JmaForecastResponse,
	parseJmaForecast,
} from "@/lib/jma";
import type { ApiResponse, WeatherForecast } from "@/lib/types";

/**
 * 天気予報エンドポイント
 * GET /api/weather?code=130000
 *
 * 気象庁 JSON を取得し、プリセット都市向けに整形して返す。
 * ISR 的にキャッシュさせるため revalidate を 30 分に設定。
 */
export async function GET(
	request: Request,
): Promise<NextResponse<ApiResponse<WeatherForecast>>> {
	const code = new URL(request.url).searchParams.get("code") ?? "";
	const city = findCity(code);

	if (!city) {
		return NextResponse.json(
			{
				success: false,
				error: {
					message: `unknown city code: ${code || "(empty)"}`,
					code: "INVALID_CITY",
				},
			},
			{ status: 400 },
		);
	}

	const upstream = await fetch(buildJmaForecastUrl(city.code), {
		next: { revalidate: 1800 },
	});

	if (!upstream.ok) {
		return NextResponse.json(
			{
				success: false,
				error: {
					message: `JMA upstream error: ${upstream.status}`,
					code: "UPSTREAM_ERROR",
				},
			},
			{ status: 502 },
		);
	}

	const raw = (await upstream.json()) as JmaForecastResponse;
	const forecast = parseJmaForecast(raw, city);

	return NextResponse.json({ success: true, data: forecast }, { status: 200 });
}

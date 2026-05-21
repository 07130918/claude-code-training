import { NextResponse } from "next/server";
import { fetchCurrentWeather } from "@/lib/weather";
import type { ApiResponse, WeatherData } from "@/lib/types";

export async function GET(): Promise<NextResponse<ApiResponse<WeatherData>>> {
  try {
    const data = await fetchCurrentWeather(35.6762, 139.6503, "東京");
    return NextResponse.json({ success: true, data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 500 }
    );
  }
}

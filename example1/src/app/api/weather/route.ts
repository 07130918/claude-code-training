import type { ApiResponse, WeatherData } from "@/lib/types";

function getWeatherDescription(code: number): string {
  if (code === 0) return "快晴";
  if (code <= 3) return "晴れ〜曇り";
  if (code <= 48) return "霧";
  if (code <= 55) return "霧雨";
  if (code <= 65) return "雨";
  if (code <= 75) return "雪";
  if (code <= 82) return "にわか雨";
  if (code <= 86) return "にわか雪";
  if (code <= 99) return "雷雨";
  return "不明";
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  if (!city) {
    return Response.json(
      {
        success: false,
        error: { message: "都市名を入力してください", code: "MISSING_CITY" },
      } satisfies ApiResponse<WeatherData>,
      { status: 400 }
    );
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ja`,
      { next: { revalidate: 3600 } }
    );

    if (!geoRes.ok) {
      throw new Error(`Geocoding API error: ${geoRes.status}`);
    }

    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return Response.json(
        {
          success: false,
          error: { message: `「${city}」は見つかりませんでした`, code: "CITY_NOT_FOUND" },
        } satisfies ApiResponse<WeatherData>,
        { status: 404 }
      );
    }

    const { latitude, longitude, name } = geoData.results[0] as {
      latitude: number;
      longitude: number;
      name: string;
    };

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
      { next: { revalidate: 600 } }
    );

    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    return Response.json({
      success: true,
      data: {
        city: name,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        weatherDescription: getWeatherDescription(current.weather_code),
        unit: {
          temperature: weatherData.current_units.temperature_2m,
          windSpeed: weatherData.current_units.wind_speed_10m,
        },
      },
    } satisfies ApiResponse<WeatherData>);
  } catch (err) {
    const message = err instanceof Error ? err.message : "不明なエラー";
    console.error("[weather] external API error:", message);

    return Response.json(
      {
        success: false,
        error: { message: "天気情報の取得に失敗しました。しばらくしてから再試行してください。", code: "API_ERROR" },
      } satisfies ApiResponse<WeatherData>,
      { status: 502 }
    );
  }
}

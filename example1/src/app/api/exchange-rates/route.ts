import type { ApiResponse, ExchangeRatesResponse } from "@/lib/types";

export async function GET() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return Response.json(
      {
        success: false,
        error: { message: "為替レートの取得に失敗しました" },
      } satisfies ApiResponse<ExchangeRatesResponse>,
      { status: 502 }
    );
  }

  const data: ExchangeRatesResponse = await res.json();
  return Response.json({ success: true, data } satisfies ApiResponse<ExchangeRatesResponse>);
}

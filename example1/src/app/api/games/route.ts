import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import type { ApiResponse, GameResult, PitcherResult } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");

  if (!date || !/^\d{8}$/.test(date)) {
    const res: ApiResponse<never> = {
      success: false,
      error: { message: "日付はYYYYMMDD形式で指定してください", code: "INVALID_DATE" },
    };
    return NextResponse.json(res, { status: 400 });
  }

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const mmdd = `${month}${day}`;

  try {
    const url = `https://npb.jp/games/${year}/schedule_${month}_detail.html`;
    const fetchRes = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "ja,en;q=0.9",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300 },
    });

    if (!fetchRes.ok) {
      throw new Error(`HTTP ${fetchRes.status}`);
    }

    const html = await fetchRes.text();
    const $ = load(html);
    const games: GameResult[] = [];

    $(`tr[id="date${mmdd}"]`).each((index, el) => {
      const $el = $(el);

      const team1 = $el.find(".team1").text().trim();
      const team2 = $el.find(".team2").text().trim();
      if (!team1 || !team2) return;

      const score1Text = $el.find(".score1").text().trim();
      const score2Text = $el.find(".score2").text().trim();
      const place = $el.find(".place").text().trim();
      const time = $el.find(".time").text().trim();

      const gameHref = $el.find('a[href*="/scores/"]').attr("href") ?? "";

      const score1Raw = parseInt(score1Text, 10);
      const score2Raw = parseInt(score2Text, 10);
      const score1 = score1Text !== "" && !isNaN(score1Raw) ? score1Raw : null;
      const score2 = score2Text !== "" && !isNaN(score2Raw) ? score2Raw : null;

      const pitchers: PitcherResult[] = [];
      $el.find(".pit").each((_, pitEl) => {
        const text = $(pitEl).text().trim();
        // 全角コロン「：」と半角コロン「:」の両方に対応
        const colonIdx = text.search(/[：:]/);
        if (colonIdx >= 0) {
          pitchers.push({
            role: text.slice(0, colonIdx).trim(),
            name: text.slice(colonIdx + 1).trim(),
          });
        }
      });

      const status: GameResult["status"] =
        score1 !== null ? "finished" : "scheduled";

      games.push({
        id: `${date}-${index}`,
        team1,
        team2,
        score1,
        score2,
        place,
        time,
        status,
        pitchers,
        gameUrl: gameHref ? `https://npb.jp${gameHref}` : "",
      });
    });

    const res: ApiResponse<GameResult[]> = { success: true, data: games };
    return NextResponse.json(res);
  } catch (error) {
    console.error("[/api/games] fetch failed:", error);
    const res: ApiResponse<never> = {
      success: false,
      error: { message: "データの取得に失敗しました", code: "FETCH_ERROR" },
    };
    return NextResponse.json(res, { status: 500 });
  }
}

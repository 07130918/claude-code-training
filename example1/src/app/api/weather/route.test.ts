import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

/**
 * テスト用にモックする気象庁 forecast JSON
 * 実際のレスポンスはもっと巨大だが、パースに必要な箇所だけを抜粋している。
 */
const mockJmaWeeklyBlock = {
	publishingOffice: "気象庁",
	reportDatetime: "2026-05-21T11:00:00+09:00",
	timeSeries: [
		{
			timeDefines: [
				"2026-05-23T00:00:00+09:00",
				"2026-05-24T00:00:00+09:00",
				"2026-05-25T00:00:00+09:00",
				"2026-05-26T00:00:00+09:00",
				"2026-05-27T00:00:00+09:00",
				"2026-05-28T00:00:00+09:00",
				"2026-05-29T00:00:00+09:00",
			],
			areas: [
				{
					area: { name: "東京地方", code: "130010" },
					weatherCodes: ["100", "101", "201", "300", "302", "200", "100"],
					pops: ["10", "20", "30", "70", "60", "40", "10"],
					reliabilities: ["A", "A", "B", "B", "C", "", ""],
				},
			],
		},
		{
			timeDefines: [
				"2026-05-23T00:00:00+09:00",
				"2026-05-24T00:00:00+09:00",
				"2026-05-25T00:00:00+09:00",
				"2026-05-26T00:00:00+09:00",
				"2026-05-27T00:00:00+09:00",
				"2026-05-28T00:00:00+09:00",
				"2026-05-29T00:00:00+09:00",
			],
			areas: [
				{
					area: { name: "東京", code: "44132" },
					tempsMin: ["16", "17", "18", "19", "17", "15", "14"],
					tempsMax: ["25", "26", "27", "23", "22", "24", "26"],
				},
			],
		},
	],
};

const mockJmaTokyoResponse = [
	{
		publishingOffice: "気象庁",
		reportDatetime: "2026-05-21T11:00:00+09:00",
		timeSeries: [
			{
				timeDefines: [
					"2026-05-21T11:00:00+09:00",
					"2026-05-22T00:00:00+09:00",
					"2026-05-23T00:00:00+09:00",
				],
				areas: [
					{
						area: { name: "東京地方", code: "130010" },
						weatherCodes: ["100", "200", "300"],
						weathers: ["晴れ", "くもり　時々　雨", "雨　後　晴れ"],
					},
				],
			},
			{
				timeDefines: [
					"2026-05-21T12:00:00+09:00",
					"2026-05-21T18:00:00+09:00",
					"2026-05-22T00:00:00+09:00",
					"2026-05-22T06:00:00+09:00",
					"2026-05-22T12:00:00+09:00",
					"2026-05-22T18:00:00+09:00",
				],
				areas: [
					{
						area: { name: "東京地方", code: "130010" },
						pops: ["10", "20", "30", "40", "50", "60"],
					},
				],
			},
			{
				timeDefines: [
					"2026-05-21T00:00:00+09:00",
					"2026-05-21T15:00:00+09:00",
					"2026-05-22T00:00:00+09:00",
					"2026-05-22T15:00:00+09:00",
				],
				areas: [
					{
						area: { name: "東京", code: "44132" },
						temps: ["18", "26", "17", "24"],
					},
				],
			},
		],
	},
	mockJmaWeeklyBlock,
];

function buildRequest(code: string | null): Request {
	const url = new URL("http://localhost/api/weather");
	if (code !== null) url.searchParams.set("code", code);
	return new Request(url);
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("GET /api/weather", () => {
	it("有効な都市コードで 200 と整形済みの予報を返すこと", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockJmaTokyoResponse), {
				status: 200,
				headers: { "content-type": "application/json" },
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const res = await GET(buildRequest("130000"));
		expect(res.status).toBe(200);

		const body = await res.json();
		expect(body.success).toBe(true);
		expect(body.data.city.name).toBe("東京");
		expect(body.data.publishingOffice).toBe("気象庁");
		expect(body.data.forecasts).toHaveLength(3);
		expect(body.data.forecasts[0].weather).toBe("晴れ");
		expect(body.data.forecasts[1].weather).toBe("くもり 時々 雨");
		expect(body.data.forecasts[0].tempMin).toBe(18);
		expect(body.data.forecasts[0].tempMax).toBe(26);
		expect(body.data.forecasts[1].tempMin).toBe(17);
		expect(body.data.forecasts[1].tempMax).toBe(24);
		expect(body.data.forecasts[2].tempMin).toBeNull();

		// 降水確率: 5/21 は 2 件 (12時, 18時), 5/22 は 4 件
		expect(body.data.forecasts[0].pops).toHaveLength(2);
		expect(body.data.forecasts[0].pops[0]).toEqual({
			time: "2026-05-21T12:00:00+09:00",
			value: 10,
		});
		expect(body.data.forecasts[1].pops).toHaveLength(4);
		expect(body.data.forecasts[1].pops.map((p) => p.value)).toEqual([
			30, 40, 50, 60,
		]);
		expect(body.data.forecasts[2].pops).toEqual([]);

		// 週間予報: 7日分
		expect(body.data.weekly).toHaveLength(7);
		expect(body.data.weekly[0]).toMatchObject({
			date: "2026-05-23T00:00:00+09:00",
			weatherCode: "100",
			weatherSummary: "晴れ",
			pop: 10,
			tempMin: 16,
			tempMax: 25,
			reliability: "A",
		});
		expect(body.data.weekly[3].weatherSummary).toBe("雨");
		expect(body.data.weekly[5].reliability).toBe("");
	});

	it("気象庁の正しい URL を都府県コード付きで叩くこと", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(
				new Response(JSON.stringify(mockJmaTokyoResponse), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		await GET(buildRequest("130000"));

		expect(fetchMock).toHaveBeenCalledTimes(1);
		const calledUrl = fetchMock.mock.calls[0][0] as string;
		expect(calledUrl).toBe(
			"https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json",
		);
	});

	it("未知の都市コードのとき 400 を返すこと", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		const res = await GET(buildRequest("999999"));
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.success).toBe(false);
		expect(body.error.code).toBe("INVALID_CITY");
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("code パラメータが無いとき 400 を返すこと", async () => {
		vi.stubGlobal("fetch", vi.fn());
		const res = await GET(buildRequest(null));
		expect(res.status).toBe(400);
	});

	it("気象庁が 5xx を返したとき 502 を返すこと", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(new Response("upstream is down", { status: 503 }));
		vi.stubGlobal("fetch", fetchMock);

		const res = await GET(buildRequest("130000"));
		expect(res.status).toBe(502);
		const body = await res.json();
		expect(body.success).toBe(false);
		expect(body.error.code).toBe("UPSTREAM_ERROR");
	});
});

"use client";

import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface TempChartPoint {
	date: string;
	min: number | null;
	max: number | null;
}

interface Props {
	data: TempChartPoint[];
}

export function TempChart({ data }: Props) {
	const formatted = data.map((d) => ({
		label: new Date(d.date).toLocaleDateString("ja-JP", {
			month: "numeric",
			day: "numeric",
		}),
		最高気温: d.max,
		最低気温: d.min,
	}));

	return (
		<ResponsiveContainer width="100%" height={260}>
			<LineChart
				data={formatted}
				margin={{ top: 16, right: 24, bottom: 8, left: 0 }}
			>
				<CartesianGrid strokeDasharray="3 3" stroke="rgba(127,127,127,0.2)" />
				<XAxis dataKey="label" tick={{ fontSize: 12 }} />
				<YAxis unit="°" tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
				<Tooltip
					formatter={(value) =>
						value === null || value === undefined ? "—" : `${value}°C`
					}
				/>
				<Legend verticalAlign="top" height={28} />
				<Line
					type="monotone"
					dataKey="最高気温"
					stroke="#dc2626"
					strokeWidth={2}
					dot={{ r: 3 }}
					connectNulls
				/>
				<Line
					type="monotone"
					dataKey="最低気温"
					stroke="#2563eb"
					strokeWidth={2}
					dot={{ r: 3 }}
					connectNulls
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

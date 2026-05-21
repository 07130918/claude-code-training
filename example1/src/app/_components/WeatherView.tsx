import type { WeatherForecast } from "@/lib/types";
import { TempChart, type TempChartPoint } from "./TempChart";
import styles from "./WeatherView.module.css";

interface Props {
	forecast: WeatherForecast;
}

function buildTempChartData(forecast: WeatherForecast): TempChartPoint[] {
	const byDate = new Map<string, TempChartPoint>();
	for (const f of forecast.forecasts) {
		byDate.set(f.date.slice(0, 10), {
			date: f.date,
			min: f.tempMin,
			max: f.tempMax,
		});
	}
	for (const w of forecast.weekly) {
		const key = w.date.slice(0, 10);
		if (!byDate.has(key)) {
			byDate.set(key, { date: w.date, min: w.tempMin, max: w.tempMax });
		}
	}
	return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export function WeatherView({ forecast }: Props) {
	const tempChartData = buildTempChartData(forecast);

	return (
		<section className={styles.root}>
			<div className={styles.meta}>
				<span>{forecast.publishingOffice}</span>
				<span>
					発表: {new Date(forecast.reportDatetime).toLocaleString("ja-JP")}
				</span>
			</div>

			<h2 className={styles.sectionTitle}>3日間予報</h2>
			<ul className={styles.forecastList}>
				{forecast.forecasts.map((day) => (
					<li key={day.date} className={styles.forecastCard}>
						<div className={styles.date}>
							{new Date(day.date).toLocaleDateString("ja-JP", {
								month: "long",
								day: "numeric",
								weekday: "short",
							})}
						</div>
						<div className={styles.weather}>{day.weather || "—"}</div>
						<div className={styles.temps}>
							<span className={styles.tempMax}>
								{day.tempMax !== null ? `${day.tempMax}°` : "—"}
							</span>
							<span className={styles.tempSep}>/</span>
							<span className={styles.tempMin}>
								{day.tempMin !== null ? `${day.tempMin}°` : "—"}
							</span>
						</div>
						{day.pops.length > 0 && (
							<div className={styles.pops} aria-label="6時間ごとの降水確率">
								<span className={styles.popsLabel}>降水確率</span>
								<div className={styles.popsList}>
									{day.pops.map((p) => (
										<div key={p.time} className={styles.popsItem}>
											<span className={styles.popsTime}>
												{new Date(p.time).toLocaleTimeString("ja-JP", {
													hour: "2-digit",
													hour12: false,
												})}
											</span>
											<span className={styles.popsValue}>{p.value}%</span>
										</div>
									))}
								</div>
							</div>
						)}
					</li>
				))}
			</ul>

			{tempChartData.length > 1 && (
				<>
					<h2 className={styles.sectionTitle}>気温推移</h2>
					<div className={styles.chartWrap}>
						<TempChart data={tempChartData} />
					</div>
				</>
			)}

			{forecast.weekly.length > 0 && (
				<>
					<h2 className={styles.sectionTitle}>週間予報</h2>
					<ul className={styles.weeklyList}>
						{forecast.weekly.map((day) => (
							<li key={day.date} className={styles.weeklyItem}>
								<div className={styles.weeklyDate}>
									{new Date(day.date).toLocaleDateString("ja-JP", {
										month: "numeric",
										day: "numeric",
										weekday: "short",
									})}
								</div>
								<div className={styles.weeklyWeather}>{day.weatherSummary}</div>
								<div className={styles.weeklyPop}>
									{day.pop !== null ? `${day.pop}%` : "—"}
								</div>
								<div className={styles.weeklyTemps}>
									<span className={styles.tempMax}>
										{day.tempMax !== null ? `${day.tempMax}°` : "—"}
									</span>
									<span className={styles.tempSep}>/</span>
									<span className={styles.tempMin}>
										{day.tempMin !== null ? `${day.tempMin}°` : "—"}
									</span>
								</div>
								{day.reliability && (
									<div className={styles.weeklyReliability}>
										信頼度 {day.reliability}
									</div>
								)}
							</li>
						))}
					</ul>
				</>
			)}
		</section>
	);
}

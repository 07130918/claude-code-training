import styles from "./ForecastSkeleton.module.css";

/**
 * <Suspense> のフォールバックとして使うスケルトン UI。
 * forecast 取得中、都市タブはそのまま表示される。
 */
export function ForecastSkeleton() {
	return (
		<div className={styles.root} aria-busy="true" aria-label="予報を読み込み中">
			<div className={styles.meta} />
			<div className={styles.sectionTitle} />
			<div className={styles.cardList}>
				{[0, 1, 2].map((i) => (
					<div key={i} className={styles.card}>
						<div className={styles.line} />
						<div className={styles.lineLarge} />
						<div className={styles.lineSmall} />
					</div>
				))}
			</div>
			<div className={styles.sectionTitle} />
			<div className={styles.chart} />
		</div>
	);
}

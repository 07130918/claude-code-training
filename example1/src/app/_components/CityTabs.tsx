import Link from "next/link";
import { CITIES } from "@/lib/cities";
import type { CityCode } from "@/lib/types";
import styles from "./CityTabs.module.css";

interface Props {
	selected: CityCode;
	compareCode?: CityCode;
}

export function CityTabs({ selected, compareCode }: Props) {
	return (
		<nav className={styles.tabs} aria-label="都市を選択">
			{CITIES.map((c) => {
				const isActive = c.code === selected;
				const params = new URLSearchParams({ city: c.code });
				// 比較相手が新しい primary と被るときはクエリから外す
				if (compareCode && compareCode !== c.code) {
					params.set("compare", compareCode);
				}
				return (
					<Link
						key={c.code}
						href={`/?${params.toString()}`}
						className={isActive ? styles.tabActive : styles.tab}
						aria-current={isActive ? "page" : undefined}
						prefetch
					>
						{c.name}
					</Link>
				);
			})}
		</nav>
	);
}

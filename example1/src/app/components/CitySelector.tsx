"use client";

import { useRouter } from "next/navigation";
import type { City } from "@/lib/cities";
import styles from "./CitySelector.module.css";

interface Props {
  cities: City[];
  currentCity: string;
}

export function CitySelector({ cities, currentCity }: Props) {
  const router = useRouter();

  return (
    <select
      className={styles.select}
      value={currentCity}
      onChange={(e) => router.push(`/?city=${encodeURIComponent(e.target.value)}`)}
      aria-label="都道府県を選択"
    >
      {cities.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

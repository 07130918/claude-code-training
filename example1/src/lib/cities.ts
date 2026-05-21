export interface City {
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { name: "東京", lat: 35.6762, lon: 139.6503 },
  { name: "大阪", lat: 34.6937, lon: 135.5023 },
  { name: "名古屋", lat: 35.1815, lon: 136.9066 },
  { name: "福岡", lat: 33.5904, lon: 130.4017 },
  { name: "札幌", lat: 43.0618, lon: 141.3545 },
  { name: "仙台", lat: 38.2688, lon: 140.8721 },
  { name: "広島", lat: 34.3853, lon: 132.4553 },
  { name: "京都", lat: 35.0116, lon: 135.7681 },
  { name: "神戸", lat: 34.6901, lon: 135.1956 },
  { name: "横浜", lat: 35.4437, lon: 139.638 },
  { name: "さいたま", lat: 35.8617, lon: 139.6455 },
  { name: "千葉", lat: 35.6073, lon: 140.1063 },
  { name: "那覇", lat: 26.2124, lon: 127.6792 },
  { name: "金沢", lat: 36.5613, lon: 136.6562 },
  { name: "静岡", lat: 34.9769, lon: 138.3831 },
  { name: "熊本", lat: 32.8031, lon: 130.7079 },
  { name: "岡山", lat: 34.6618, lon: 133.935 },
  { name: "鹿児島", lat: 31.5969, lon: 130.5571 },
  { name: "新潟", lat: 37.9026, lon: 139.0233 },
  { name: "宇都宮", lat: 36.5551, lon: 139.883 },
  { name: "前橋", lat: 36.3912, lon: 139.0608 },
  { name: "水戸", lat: 36.3418, lon: 140.4469 },
  { name: "長野", lat: 36.6513, lon: 138.1811 },
  { name: "甲府", lat: 35.664, lon: 138.5685 },
  { name: "津", lat: 34.7303, lon: 136.5086 },
  { name: "大津", lat: 35.0045, lon: 135.8686 },
  { name: "奈良", lat: 34.6851, lon: 135.805 },
  { name: "和歌山", lat: 34.226, lon: 135.1675 },
  { name: "鳥取", lat: 35.5039, lon: 134.2378 },
  { name: "松江", lat: 35.4681, lon: 133.0504 },
  { name: "山口", lat: 34.1859, lon: 131.4706 },
  { name: "徳島", lat: 34.0658, lon: 134.5593 },
  { name: "高松", lat: 34.3401, lon: 134.0434 },
  { name: "松山", lat: 33.8416, lon: 132.7657 },
  { name: "高知", lat: 33.5597, lon: 133.5311 },
  { name: "佐賀", lat: 33.2494, lon: 130.299 },
  { name: "長崎", lat: 32.7503, lon: 129.8777 },
  { name: "大分", lat: 33.2382, lon: 131.6126 },
  { name: "宮崎", lat: 31.911, lon: 131.4235 },
  { name: "青森", lat: 40.8244, lon: 140.74 },
  { name: "盛岡", lat: 39.7036, lon: 141.1527 },
  { name: "秋田", lat: 39.7186, lon: 140.1024 },
  { name: "山形", lat: 38.2404, lon: 140.3636 },
  { name: "福島", lat: 37.75, lon: 140.4676 },
  { name: "富山", lat: 36.6959, lon: 137.2137 },
  { name: "福井", lat: 36.0652, lon: 136.2216 },
  { name: "岐阜", lat: 35.4232, lon: 136.7608 },
];

export function findCity(name: string): City {
  return CITIES.find((c) => c.name === name) ?? CITIES[0];
}

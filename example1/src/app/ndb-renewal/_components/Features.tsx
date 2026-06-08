import styles from "../page.module.css";

// 会社の特徴：現行サイトから読み取れる強みに限定（実績・数値は追加しない）
const features = [
  {
    title: "ライフサイクル全般を支援",
    description:
      "要件定義から開発、移行・導入、運用まで。情報システムのライフサイクル全般を一貫してサポートします。",
  },
  {
    title: "お客様先での支援",
    description:
      "オンサイトサービスとして、お客様のロケーションで弊社要員が業務をご支援します。",
  },
  {
    title: "業務ノウハウとプロジェクト管理経験",
    description:
      "開発・運用で培った業務ノウハウやプロジェクト管理の経験を活かし、構想段階からご支援します。",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className={styles.sectionAlt}
      aria-labelledby="features-heading"
    >
      <div className={styles.container}>
        <h2 id="features-heading" className={styles.sectionTitle}>
          私たちの特徴
        </h2>
        <p className={styles.sectionLead}>
          情報システムを、企画から運用まで幅広く支える体制です。
        </p>
        <ul className={styles.cardGrid}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

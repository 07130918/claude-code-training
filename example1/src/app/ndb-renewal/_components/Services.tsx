import styles from "../page.module.css";

// サービス紹介：現行サイトの3サービスの趣旨に沿って言い換え（機能を盛らない）
const services = [
  {
    title: "開発・導入サービス",
    description:
      "情報システムの要件定義支援から、設計・製造・テスト、移行・導入までを一貫してご支援します。",
  },
  {
    title: "オンサイトサービス",
    description:
      "情報システムの企画・開発・導入・移行に関わる業務を、お客様のロケーションで弊社要員がご支援します。",
  },
  {
    title: "コンサルテーションサービス",
    description:
      "システムの開発・運用で培った業務ノウハウやプロジェクト管理経験をもとに、情報システムの基本構想立案や推進計画などをご支援します。",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-heading"
    >
      <div className={styles.container}>
        <h2 id="services-heading" className={styles.sectionTitle}>
          サービス
        </h2>
        <p className={styles.sectionLead}>
          情報システムのライフサイクル全般を、3つのサービスでご支援します。
        </p>
        <ul className={styles.cardGrid}>
          {services.map((service) => (
            <li key={service.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

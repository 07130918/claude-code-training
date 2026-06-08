import styles from "../page.module.css";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: "💻",
    title: "開発・導入サービス",
    description:
      "要件定義支援から設計・製造・テスト、移行・導入支援まで一貫して対応します。製造業や金融業でのシステム構築・運用経験を活かし、高可用性を必要とするシステムにも対応します。",
  },
  {
    icon: "🤝",
    title: "オンサイトサービス",
    description:
      "企画・開発・導入・移行に関わる業務をお客様のロケーションで支援します。アプリケーションの保守・運用やITインフラの運用管理にも対応し、業務量の変動に柔軟に応じます。",
  },
  {
    icon: "📊",
    title: "コンサルテーションサービス",
    description:
      "システム開発・運用で培った業務ノウハウとプロジェクト管理経験をもとに支援します。基本構想立案・EVM分析・入札対応（提案書作成・検査対応）まで幅広く対応します。",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Services</p>
        <h2 className={styles.sectionTitle}>3つのサービス</h2>
        <p className={styles.sectionDesc}>
          情報システムのライフサイクル全般を一貫してサポートします。
        </p>
        <div className={styles.servicesGrid}>
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

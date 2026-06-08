import styles from "../page.module.css";

const features = [
  {
    icon: "🔄",
    title: "ライフサイクル全般を支援",
    description:
      "企画から開発・導入・保守・運用まで、情報システムのライフサイクル全般を一貫してサポートします。",
  },
  {
    icon: "📍",
    title: "お客様先での支援体制",
    description:
      "お客様のロケーションに密着したオンサイト型の支援体制で、現場の課題に直接向き合います。",
  },
  {
    icon: "🧠",
    title: "業務ノウハウとプロジェクト管理経験",
    description:
      "長年のシステム開発・運用で蓄積した業務知識とプロジェクト管理の知見を活かした支援を行います。",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.sectionAlt}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Features</p>
        <h2 className={styles.sectionTitle}>NDBが選ばれる理由</h2>
        <p className={styles.sectionDesc}>
          1976年の創業以来、お客様の情報システムを支え続けてきた実績と体制があります。
        </p>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden="true">
                {f.icon}
              </span>
              <div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

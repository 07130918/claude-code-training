import styles from "../page.module.css";

export default function RecruitSection() {
  return (
    <section id="recruit" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.recruitBox}>
          <div>
            <p className={styles.sectionLabelLight}>Recruit</p>
            <h2 className={styles.recruitTitle}>一緒に未来を創りませんか</h2>
            <p className={styles.recruitDesc}>
              NDBは1976年創業の独立系ITサービス企業です。製造業・金融業など幅広い業界の
              システム開発・保守・運用を支えています。218名のチームでお客様の課題に正面から
              向き合っており、エンジニアとして成長したい方や、システムを通じて社会に貢献したい方を歓迎します。
            </p>
          </div>
          <div className={styles.recruitStats}>
            <div className={styles.stat}>
              <p className={styles.statNum}>1976</p>
              <p className={styles.statLabel}>年 創業</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statNum}>218</p>
              <p className={styles.statLabel}>名 在籍（2026年4月）</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

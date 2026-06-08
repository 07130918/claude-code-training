import styles from "../page.module.css";

// 採用向けセクション：ジュニアエンジニアにも伝わる平易な紹介
// 制度・待遇など未確認の情報は記載しない（仕事内容の説明にとどめる）
const points = [
  "要件定義から開発、お客様先での支援まで、幅広い仕事に携われます。",
  "先輩エンジニアと一緒に、少しずつ実務を覚えていける環境です。",
  "業務システムづくりを通して、お客様の課題解決に取り組めます。",
];

export default function Recruit() {
  return (
    <section
      id="recruit"
      className={styles.section}
      aria-labelledby="recruit-heading"
    >
      <div className={styles.container}>
        <h2 id="recruit-heading" className={styles.sectionTitle}>
          採用情報
        </h2>
        <p className={styles.sectionLead}>
          日本デェイブレイクは、情報システムの企画から運用までを手がけるIT企業です。
          これからエンジニアを目指す方も、お客様の「未来を創る」仕事に挑戦できます。
        </p>
        <ul className={styles.recruitPoints}>
          {points.map((point) => (
            <li key={point} className={styles.recruitPoint}>
              {point}
            </li>
          ))}
        </ul>
        <a className={styles.btnPrimary} href="#contact">
          話を聞いてみる
        </a>
      </div>
    </section>
  );
}

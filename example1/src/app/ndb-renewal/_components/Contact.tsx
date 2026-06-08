import styles from "../page.module.css";

// お問い合わせ導線：未確認の連絡先（電話番号・メール等）は記載せず、
// ダミーのアンカー導線にとどめる
export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <h2 id="contact-heading" className={styles.sectionTitle}>
          お問い合わせ
        </h2>
        <p className={styles.contactLead}>
          サービスや採用に関するご相談は、お気軽にお問い合わせください。
        </p>
        <div className={styles.contactActions}>
          {/* 実フォーム未実装のモックのため、href="#" による先頭スクロールを避け、
              リンクではなく無効化したボタン（操作）として表現する */}
          <button type="button" className={styles.btnPrimary} disabled>
            お問い合わせフォームへ
          </button>
        </div>
        <p className={styles.contactNote}>
          ※ 本ページは研修用モックのため、お問い合わせフォームは用意していません。
        </p>
      </div>
    </section>
  );
}

import styles from "../page.module.css";

type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: Props) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon} aria-hidden="true">{icon}</div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
    </div>
  );
}

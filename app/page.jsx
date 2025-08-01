import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Impossible Password</p>
      <div className={styles.input}>
        <p>Choose a password</p>
        <input type="text" />
      </div>
      <div className={styles.rules}></div>
    </div>
  );
}

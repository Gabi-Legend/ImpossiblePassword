import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <>
      <h1>Impossible Password</h1>
      <p>Try to choose an impossible password!</p>
      <div className={styles.container}></div>
    </>
  );
}

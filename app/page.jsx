"use client";

import styles from "@/app/page.module.css";
import { useState } from "react";

export default function Home() {
  const [password, handlePasswordChange] = useState("");
  const rules = [
    "Minimum 5 characters",
    "Must include at least 1 number",
    "Must include at least 1 capital letter",
    "Must include the full name of one month (e.g. 'January')",
    "Must include at least 3 special characters (e.g. @, #, $)",
    "All digits must multiply to exactly 36",
    "Must include at least one Greek letter (e.g. α, β, γ)",
    "Must contain a prime number written in words (e.g. 'seven')",
    "All vowels (a, e, i, o, u) must appear in alphabetical order",
    "Reversed password must form a valid English word or palindrome",
    "Sum of all character charCodes must be divisible by 101",
    "Must include at least 2 different emoji",
    "Must include the abbreviation of 2 chemical elements (e.g. 'Na', 'Cl')",
    "Must contain a full pangram fragment (e.g. 'quick brown fox')",
    "Cannot contain the same character more than twice",
  ];

  return (
    <div className={styles.container}>
      <p className={styles.title}>Impossible Password</p>
      <div className={styles.input}>
        <p>Choose a password</p>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            handlePasswordChange(e.target.value);
          }}
        />
      </div>
      <div className={styles.rulesContainer}>
        {rules.map((rule, index) => {
          return <div key={index}>{rule}</div>;
        })}
      </div>
    </div>
  );
}

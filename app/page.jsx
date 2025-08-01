"use client";

import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const rules = [
    "Minimum 5 characters",
    "Must include at least 1 number",
    "Must include at least 1 capital letter",
    "Must include the full name of one month (e.g. 'January')",
    "Must include at least 3 special characters (e.g. @, #, $)",
    "All digits must multiply to exactly 36",
    // ... poți adăuga restul aici când vrei
  ];

  // Helper: calculează produsul cifrelor din parolă
  function productOfDigits(str) {
    const digits = str.match(/\d/g);
    if (!digits) return 0;
    return digits.reduce((acc, d) => acc * Number(d), 1);
  }

  function checkRule(password, ruleIndex) {
    switch (ruleIndex) {
      case 0:
        return password.length >= 5;
      case 1:
        return /\d/.test(password);
      case 2:
        return /[A-Z]/.test(password);
      case 3:
        // verifică dacă parola conține numele complet al unei luni (litere mari/lit)
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months.some((month) =>
          password.toLowerCase().includes(month.toLowerCase())
        );
      case 4:
        // cel puțin 3 caractere speciale dintr-un set dat
        const specials = password.match(/[@#$%^&*()_\-+=!]/g) || [];
        return specials.length >= 3;
      case 5:
        return productOfDigits(password) === 36;
      default:
        return false;
    }
  }

  useEffect(() => {
    if (currentStep < rules.length && checkRule(password, currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  }, [password, currentStep]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Impossible Password</p>
      <div className={styles.input}>
        <p>Choose a password</p>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.rulesContainer}>
        {rules.slice(0, currentStep + 1).map((rule, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {rule}
          </div>
        ))}
        {currentStep === rules.length && (
          <div style={{ marginTop: "20px", color: "green" }}>
            🎉 Password meets all the rules!
          </div>
        )}
      </div>
    </div>
  );
}

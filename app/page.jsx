"use client";

import styles from "@/app/page.module.css";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const rules = [
    "Minimum 8 characters",
    "At least 1 number",
    "At least 1 capital letter",
    "At least 1 lowercase letter",
    "Must include a full month name",
    "At least 2 special characters",
    "All digits must multiply to 36",
    "Must include exactly one underscore (_)",
    "Must include exactly one dash (-)",
    "Must contain a sequence of 3 increasing digits",
    "No whitespace allowed",
    "No character can appear more than twice",
    "Must end with a special character",
    "Must include a programming language",
    "Length must be exactly 21 characters",
  ];

  function productOfDigits(str) {
    const digits = str.match(/\d/g);
    if (!digits || digits.includes("0")) return 0;
    return digits.reduce((acc, d) => acc * Number(d), 1);
  }

  function hasIncreasingDigits(str) {
    const digits = str.match(/\d/g)?.map(Number) || [];
    for (let i = 0; i < digits.length - 2; i++) {
      if (digits[i] + 1 === digits[i + 1] && digits[i] + 2 === digits[i + 2]) {
        return true;
      }
    }
    return false;
  }

  function countOccurrences(str) {
    const count = {};
    for (let char of str) {
      count[char] = (count[char] || 0) + 1;
    }
    return count;
  }

  function checkRule(index) {
    switch (index) {
      case 0:
        return password.length >= 8;
      case 1:
        return /\d/.test(password);
      case 2:
        return /[A-Z]/.test(password);
      case 3:
        return /[a-z]/.test(password);
      case 4:
        return [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ].some((m) => password.toLowerCase().includes(m));
      case 5:
        return (password.match(/[@#$%^&*!?]/g) || []).length >= 2;
      case 6:
        return productOfDigits(password) === 36;
      case 7:
        return (password.match(/_/g) || []).length === 1;
      case 8:
        return (password.match(/-/g) || []).length === 1;
      case 9:
        return hasIncreasingDigits(password);
      case 10:
        return !/\s/.test(password);
      case 11:
        return Object.values(countOccurrences(password)).every((v) => v <= 2);
      case 12:
        return /[@#$%^&*!?]$/.test(password);
      case 13:
        return /(python|java|rust|go|ruby|c\+\+|typescript|javascript)/i.test(
          password
        );
      case 14:
        return password.length === 21;
      default:
        return false;
    }
  }

  const passedSteps = rules.findIndex((_, index) => !checkRule(index));
  const stepsToShow = passedSteps === -1 ? rules.length : passedSteps;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Impossible Password</p>
      <div className={styles.input}>
        <p>Choose a password</p>
        <textarea
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rows={1}
          style={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
            lineHeight: "1",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "30px",
          }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
      <div className={styles.rulesContainer}>
        {rules.slice(0, stepsToShow + 1).map((rule, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {checkRule(index) ? "✅ " : "❌ "}
            {rule}
          </div>
        ))}
        {stepsToShow === rules.length && (
          <div style={{ marginTop: "20px", color: "green" }}>
            🎉 Password meets all the rules!
          </div>
        )}
      </div>
    </div>
  );
}

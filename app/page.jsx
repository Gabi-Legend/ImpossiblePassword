"use client";

import styles from "@/app/page.module.css";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const textareaRef = useRef(null);

  const rules = [
    "Minimum 6 characters",
    "Must include at least 1 number",
    "Must include at least 1 capital letter",
    "Must include at least 1 lowercase letter",
    "Must include at least 1 special character (e.g. @, #, $, %, &, !)",
    "Must include the full name of one month (e.g. 'March')",
    "Must include a 3-letter English word (e.g. 'cat', 'sun')",
    "All digits must add up to an even number",
    "Must include a Greek letter (e.g. α, β, γ) or math symbol (e.g. ∑, √)",
    "Must contain a color name (e.g. 'red', 'blue')",
    "Cannot have the same character more than 3 times total",
    "Must contain a chemical element abbreviation (e.g. 'Na', 'Fe')",
    "Must include the name of a programming language (e.g. 'Python')",
    "Must contain a palindrome fragment (e.g. 'eve', 'ana')",
    "Must not start and end with the same character",
  ];

  function hasSpecialChar(str) {
    return /[@#$%^&*!&()\-_+=]/.test(str);
  }

  function hasMonth(str) {
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
      str.toLowerCase().includes(month.toLowerCase())
    );
  }

  function has3LetterWord(str) {
    const words = ["cat", "sun", "map", "run", "dog", "car"];
    return words.some((word) => str.toLowerCase().includes(word));
  }

  function digitsSumEven(str) {
    const digits = str.match(/\d/g);
    if (!digits) return false;
    const sum = digits.reduce((acc, d) => acc + Number(d), 0);
    return sum % 2 === 0;
  }

  function hasGreekOrMathSymbol(str) {
    return /[α-ωΑ-Ω∑√π∞∆]/.test(str);
  }

  function hasColor(str) {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "black",
      "white",
      "orange",
    ];
    return colors.some((color) => str.toLowerCase().includes(color));
  }

  function maxThreeSameChars(str) {
    const counts = {};
    for (let ch of str) {
      counts[ch] = (counts[ch] || 0) + 1;
      if (counts[ch] > 3) return false;
    }
    return true;
  }

  function hasElement(str) {
    const elements = ["Na", "Cl", "Fe", "H", "O", "C", "Li", "He"];
    return elements.some((el) => str.includes(el));
  }

  function hasProgrammingLanguage(str) {
    const langs = ["python", "java", "ruby", "go", "swift", "csharp"];
    return langs.some((lang) => str.toLowerCase().includes(lang));
  }

  function hasPalindromeFragment(str) {
    const frags = ["eve", "ana", "bob", "pop", "madam"];
    return frags.some((p) => str.toLowerCase().includes(p));
  }

  function startEndDifferent(str) {
    if (str.length < 2) return false;
    return str[0].toLowerCase() !== str[str.length - 1].toLowerCase();
  }

  function checkRule(ruleIndex) {
    switch (ruleIndex) {
      case 0:
        return password.length >= 6;
      case 1:
        return /\d/.test(password);
      case 2:
        return /[A-Z]/.test(password);
      case 3:
        return /[a-z]/.test(password);
      case 4:
        return hasSpecialChar(password);
      case 5:
        return hasMonth(password);
      case 6:
        return has3LetterWord(password);
      case 7:
        return digitsSumEven(password);
      case 8:
        return hasGreekOrMathSymbol(password);
      case 9:
        return hasColor(password);
      case 10:
        return maxThreeSameChars(password);
      case 11:
        return hasElement(password);
      case 12:
        return hasProgrammingLanguage(password);
      case 13:
        return hasPalindromeFragment(password);
      case 14:
        return startEndDifferent(password);
      default:
        return false;
    }
  }

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    adjustHeight();
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  const passedSteps = rules.findIndex((_, i) => !checkRule(i));
  const stepsToShow = passedSteps === -1 ? rules.length : passedSteps;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Impossible Password (Lite Edition)</p>
      <div className={styles.inputContainer}>
        <label htmlFor="passwordInput">Choose a password</label>
        <textarea
          id="passwordInput"
          ref={textareaRef}
          value={password}
          onChange={handleChange}
          className={styles.textarea}
          rows={1}
        />
      </div>
      <div className={styles.rulesContainer}>
        {rules.slice(0, stepsToShow + 1).map((rule, index) => (
          <div
            key={index}
            className={`${styles.ruleItem} ${
              checkRule(index) ? styles.pass : styles.fail
            }`}
          >
            {checkRule(index) ? "✅ " : "❌ "}
            {rule}
          </div>
        ))}
        {stepsToShow === rules.length && (
          <div className={styles.success}>🎉 Password meets all the rules!</div>
        )}
      </div>
    </div>
  );
}

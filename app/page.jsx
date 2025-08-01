"use client";

import styles from "@/app/page.module.css";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const rules = [
    "Minimum 5 characters",
    "Must include at least 1 number",
    "Must include at least 1 capital letter",
    "Must include at least 1 lowercase letter",
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
    "Must contain exactly one underscore (_) and one dash (-)",
    "Must contain a valid Roman numeral (e.g. 'XIV')",
    "Must start and end with a different letter",
    "Must contain a sequence of 3 increasing digits (e.g. 456)",
    "Must not contain any whitespace",
    "Length must be a Fibonacci number (e.g. 8, 13, 21, 34...)",
    "Must contain the name of a programming language (e.g. 'Python', 'Java')",
  ];

  function productOfDigits(str) {
    const digits = str.match(/\d/g);
    if (!digits || digits.includes("0")) return 0;
    return digits.reduce((acc, d) => acc * Number(d), 1);
  }

  function checkRule(index) {
    const lower = password.toLowerCase();
    switch (index) {
      case 0:
        return password.length >= 5;
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
        ].some((month) => lower.includes(month));
      case 5:
        return (password.match(/[@#$%^&*()_\-+=!]/g) || []).length >= 3;
      case 6:
        return productOfDigits(password) === 36;
      case 7:
        return /[α-ωΑ-Ω]/.test(password);
      case 8:
        return ["two", "three", "five", "seven", "eleven", "thirteen"].some(
          (word) => lower.includes(word)
        );
      case 9:
        const vowels = ["a", "e", "i", "o", "u"];
        let lastIndex = -1;
        return vowels.every((v) => {
          const i = password.indexOf(v, lastIndex + 1);
          if (i === -1) return false;
          lastIndex = i;
          return true;
        });
      case 10:
        const reversed = password.split("").reverse().join("");
        return reversed === password || /^[a-z]+$/i.test(reversed);
      case 11:
        const sum = [...password].reduce((acc, c) => acc + c.charCodeAt(0), 0);
        return sum % 101 === 0;
      case 12:
        const emojiRegex = /\p{Emoji}/gu;
        return (
          (password.match(emojiRegex) || []).filter(
            (v, i, a) => a.indexOf(v) === i
          ).length >= 2
        );
      case 13:
        const elements = [
          "H",
          "He",
          "Li",
          "Be",
          "B",
          "C",
          "N",
          "O",
          "F",
          "Ne",
          "Na",
          "Cl",
          "K",
          "Ca",
        ];
        return elements.filter((el) => password.includes(el)).length >= 2;
      case 14:
        return password.toLowerCase().includes("quick brown fox");
      case 15:
        return [...new Set(password)].every(
          (char) => password.split(char).length - 1 <= 2
        );
      case 16:
        return (
          password.includes("_") &&
          password.includes("-") &&
          password.indexOf("_") === password.lastIndexOf("_") &&
          password.indexOf("-") === password.lastIndexOf("-")
        );
      case 17:
        return /\bM{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/i.test(
          password
        );
      case 18:
        return (
          password[0]?.toLowerCase() !==
          password[password.length - 1]?.toLowerCase()
        );
      case 19:
        return (
          /(?=.*(\d)(\d)(\d))/.test(password) &&
          [...password.matchAll(/(\d)(\d)(\d)/g)].some((m) => {
            const [a, b, c] = m.slice(1).map(Number);
            return a + 1 === b && b + 1 === c;
          })
        );
      case 20:
        return !/\s/.test(password);
      case 21:
        const fib = [0, 1];
        while (fib[fib.length - 1] < password.length) {
          fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
        }
        return fib.includes(password.length);
      case 22:
        return ["python", "java", "c++", "javascript", "ruby"].some((lang) =>
          lower.includes(lang)
        );
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
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

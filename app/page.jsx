"use client";

import styles from "@/app/page.module.css";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const textareaRef = useRef(null);

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

  function containsGreekLetter(str) {
    return /[αβγδεζηθικλμνξοπρστυφχψω]/i.test(str);
  }

  function containsPrimeWord(str) {
    const primes = [
      "two",
      "three",
      "five",
      "seven",
      "eleven",
      "thirteen",
      "seventeen",
      "nineteen",
      "twentythree",
      "twenty-nine",
    ];
    return primes.some((p) => str.toLowerCase().includes(p));
  }

  function vowelsInOrder(str) {
    const vowels = str.toLowerCase().match(/[aeiou]/g);
    if (!vowels) return false;
    const ordered = [...vowels].sort();
    for (let i = 0; i < vowels.length; i++) {
      if (vowels[i] !== ordered[i]) return false;
    }
    return true;
  }

  function isPalindromeOrEnglishWord(str) {
    const reversed = str.toLowerCase().split("").reverse().join("");
    if (str.toLowerCase() === reversed) return true;

    // Simplified dictionary check (example)
    const dictionary = ["level", "madam", "radar", "deed", "civic"];
    return dictionary.includes(reversed);
  }

  function sumCharCodesDivisibleBy101(str) {
    const sum = [...str].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return sum % 101 === 0;
  }

  function countDifferentEmojis(str) {
    const emojiRegex = /\p{Emoji}/gu;
    const emojis = str.match(emojiRegex) || [];
    const uniqueEmojis = new Set(emojis);
    return uniqueEmojis.size >= 2;
  }

  function containsChemicalElements(str) {
    const elements = ["Na", "Cl", "He", "Li", "Be", "C", "N", "O", "F", "Ne"];
    let found = 0;
    elements.forEach((el) => {
      if (str.includes(el)) found++;
    });
    return found >= 2;
  }

  function containsPangramFragment(str) {
    return str.toLowerCase().includes("quick brown fox");
  }

  function maxTwoSameChars(str) {
    const counts = {};
    for (let ch of str) {
      counts[ch] = (counts[ch] || 0) + 1;
      if (counts[ch] > 2) return false;
    }
    return true;
  }

  function exactlyOneUnderscoreAndDash(str) {
    const underscoreCount = (str.match(/_/g) || []).length;
    const dashCount = (str.match(/-/g) || []).length;
    return underscoreCount === 1 && dashCount === 1;
  }

  function validRomanNumeral(str) {
    return /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))$/i.test(
      str
    );
  }

  function startEndDifferent(str) {
    if (str.length < 2) return false;
    return str[0].toLowerCase() !== str[str.length - 1].toLowerCase();
  }

  function threeIncreasingDigits(str) {
    const digits = str.match(/\d/g);
    if (!digits) return false;
    for (let i = 0; i < digits.length - 2; i++) {
      const a = Number(digits[i]);
      const b = Number(digits[i + 1]);
      const c = Number(digits[i + 2]);
      if (b === a + 1 && c === b + 1) return true;
    }
    return false;
  }

  function noWhitespace(str) {
    return !/\s/.test(str);
  }

  function isFibonacci(num) {
    if (num <= 0) return false;
    const isPerfectSquare = (x) => {
      const s = Math.floor(Math.sqrt(x));
      return s * s === x;
    };
    return (
      isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4)
    );
  }

  function containsProgrammingLanguage(str) {
    const langs = [
      "python",
      "java",
      "javascript",
      "ruby",
      "csharp",
      "go",
      "swift",
    ];
    return langs.some((lang) => str.toLowerCase().includes(lang));
  }

  function checkRule(ruleIndex) {
    switch (ruleIndex) {
      case 0:
        return password.length >= 5;
      case 1:
        return /\d/.test(password);
      case 2:
        return /[A-Z]/.test(password);
      case 3:
        return /[a-z]/.test(password);
      case 4:
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
      case 5:
        const specials = password.match(/[@#$%^&*()_\-+=!]/g) || [];
        return specials.length >= 3;
      case 6:
        return productOfDigits(password) === 36;
      case 7:
        return containsGreekLetter(password);
      case 8:
        return containsPrimeWord(password);
      case 9:
        return vowelsInOrder(password);
      case 10:
        return isPalindromeOrEnglishWord(password);
      case 11:
        return sumCharCodesDivisibleBy101(password);
      case 12:
        return countDifferentEmojis(password);
      case 13:
        return containsChemicalElements(password);
      case 14:
        return containsPangramFragment(password);
      case 15:
        return maxTwoSameChars(password);
      case 16:
        return exactlyOneUnderscoreAndDash(password);
      case 17:
        return validRomanNumeral(password);
      case 18:
        return startEndDifferent(password);
      case 19:
        return threeIncreasingDigits(password);
      case 20:
        return noWhitespace(password);
      case 21:
        return isFibonacci(password.length);
      case 22:
        return containsProgrammingLanguage(password);
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
      <p className={styles.title}>Impossible Password</p>
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

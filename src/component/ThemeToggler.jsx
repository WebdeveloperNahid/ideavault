"use client";

import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Page load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );

    setIsDark(savedTheme === "synthwave");

    setMounted(true);
  }, []);

  // Theme toggle
  const toggleTheme = (e) => {
    const nextTheme = e.target.checked
      ? "synthwave"
      : "light";

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme
    );

    localStorage.setItem("theme", nextTheme);

    setIsDark(e.target.checked);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center p-4">
      <label className="swap swap-rotate text-base-content">

        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={isDark}
          className="theme-controller"
        />

        {/* Sun */}
        <svg
          className="swap-off w-6 h-6 text-[#1999f5]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon */}
        <svg
          className="swap-on w-6 h-6 text-[#1999f5]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>

      </label>
    </div>
  );
};

export default ThemeToggler;
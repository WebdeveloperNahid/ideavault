"use client";

import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );

    setIsDark(savedTheme === "synthwave");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;

    setIsDark(dark);

    const theme = dark ? "synthwave" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      {isDark ? (
        // Moon Icon
        <svg
          className="w-7 h-7 text-[#1999f5]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        // Sun Icon
        <svg
          className="w-7 h-7 text-[#1999f5]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="m4.93 4.93 1.41 1.41" /> <path d="m17.66 17.66 1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="m6.34 17.66-1.41 1.41" /> <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggler;
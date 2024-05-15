"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ChangeTheme() {
  const [checked, setChecked] = useState(false);

  const [{ theme }, setCookies] = useCookies(["theme"]);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("theme")
    ) {
      setThemeAttribute("dark");
    }

    if (theme === "dark") {
      setChecked(true);
    }

    setThemeAttribute(
      localStorage.getItem("theme") === "dark" ? "dark" : "autumn",
    );
  }, []);

  const setThemeAttribute = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const handleChangeTheme = (
    event: SyntheticEvent<HTMLInputElement, Event>,
  ) => {
    setChecked((prev) => !prev);
    let newTheme = (event as any).target.checked ? "dark" : "autumn";
    localStorage.setItem("theme", newTheme);
    setCookies("theme", newTheme);
    setThemeAttribute(newTheme);
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        type="checkbox"
        className="toggle"
        checked={checked}
        onClick={handleChangeTheme}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/features/themeSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: any) => state.theme);

  const handleThemeToggle = () => {
    // theme state'ini "dark" veya "light" olarak değiştiriyoruz
    dispatch(toggleTheme(theme === "dark" ? "light" : "dark"));
    // document'e dark sınıfını ekleyip çıkaralım
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
        Next Store
      </Link>

      <button
        onClick={handleThemeToggle}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Tema Değiştir"
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-400" />
        ) : (
          <Moon className="text-gray-700" />
        )}
      </button>
    </header>
  );
}

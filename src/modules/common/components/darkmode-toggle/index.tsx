"use client"

import { useState, useEffect } from "react"

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    setIsDarkMode(
      storedTheme
        ? storedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", isDarkMode ? "light" : "dark") // Persist theme
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  return (
    <button onClick={toggleDarkMode} className="text-ui-fg-base">
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  )
}

export default DarkModeToggle

"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "@medusajs/icons"

import Button from "@modules/common/components/custom-button"

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme")
  //   setIsDarkMode(
  //     storedTheme
  //       ? storedTheme === "dark"
  //       : window.matchMedia("(prefers-color-scheme: dark)").matches
  //   )
  // }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", isDarkMode ? "light" : "dark") // Persist theme
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  return (
    <Button
      variant="secondary"
      onClick={toggleDarkMode}
      className="text-base-regular text-ui-fg-subtle"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  )
}

export default DarkModeToggle

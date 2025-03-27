"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  // Always start with false for SSR consistency
  const [isMobile, setIsMobile] = useState(false)
  // Track if component is mounted
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted
    setMounted(true)

    // Safe check for window object
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener
      window.addEventListener("resize", checkIfMobile)

      // Clean up
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Always return false during SSR or before mount
  // This ensures consistent rendering between server and client
  return mounted ? isMobile : false
}


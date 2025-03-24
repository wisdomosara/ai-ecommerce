"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // We don't need to track mounting state anymore since we're using the script in the head
  // This simplifies the component and avoids unnecessary re-renders
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}


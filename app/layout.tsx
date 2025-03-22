import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | ShopHub",
    default: "ShopHub - Modern E-commerce Platform",
  },
  description: "A modern e-commerce platform with a wide range of products",
  metadataBase: new URL("https://shophub.example.com"),
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6 md:py-8">
                  <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>

        {/* Add script to fix theme toggle */}
        <Script id="theme-toggle-fix" strategy="afterInteractive">
          {`
            (function() {
              // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            })()
          `}
        </Script>
      </body>
    </html>
  )
}


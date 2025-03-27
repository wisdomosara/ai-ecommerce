"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, LogIn, UserPlus, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const { cartItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  // Fix theme toggle by ensuring component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Check if we're already on the search page
      if (pathname === "/search") {
        // If already on search page, use router.replace to update the URL without adding to history
        router.replace(`/search?q=${encodeURIComponent(searchQuery)}`)
      } else {
        // If not on search page, use router.push to navigate to search page
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
      closeMenu()
    }
  }

  const handleLogout = () => {
    logout()
    closeMenu()
    router.push("/")
  }

  const closeMenu = () => {
    setIsMenuClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsMenuClosing(false)
    }, 300) // Match animation duration
  }

  const navItems = [
    { name: "Categories", href: "/categories" },
    { name: "Collections", href: "/collections" },
    { name: "Sell", href: "/sell" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-2 md:mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex flex-1 items-center justify-center px-6">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Mobile search */}
        <div className="flex md:hidden flex-1 items-center justify-center pl-1 pr-2">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-background/0 hover:bg-background/80 dark:hover:bg-white/20"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {/* Desktop user menu */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background/0 hover:bg-background/80 dark:hover:bg-white/20"
                >
                  {mounted && isAuthenticated && user?.image ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dropdown-content">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {mounted && (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      const newTheme = theme === "dark" ? "light" : "dark"
                      setTheme(newTheme)

                      // Manually update the class to avoid flash on next page load
                      if (newTheme === "dark") {
                        document.documentElement.classList.add("dark")
                      } else {
                        document.documentElement.classList.remove("dark")
                      }
                    }}
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button with avatar */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {mounted && isAuthenticated && user?.image ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {(isMenuOpen || isMenuClosing) && (
        <div className="fixed inset-0 z-50 md:hidden h-screen bg-background/95 backdrop-blur-sm">
          <div
            className="fixed inset-0 bg-background flex flex-col"
            style={{
              animation: isMenuClosing ? "slideOutRight 0.3s ease-out forwards" : "slideInRight 0.3s ease-out forwards",
            }}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-bold text-xl">Menu</span>
              <Button variant="ghost" size="icon" onClick={closeMenu} className="absolute right-4 top-4">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6 p-6 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary flex items-center",
                    pathname === item.href ? "text-primary font-semibold" : "text-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="text-base font-medium transition-colors hover:text-primary flex items-center"
                    onClick={closeMenu}
                  >
                    <User className="mr-3 h-5 w-5" />
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="text-base font-medium transition-colors hover:text-primary flex items-center"
                    onClick={closeMenu}
                  >
                    <Package className="mr-3 h-5 w-5" />
                    My Orders
                  </Link>
                  <button
                    className="text-base font-medium transition-colors hover:text-primary text-left flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-base font-medium transition-colors hover:text-primary flex items-center"
                    onClick={closeMenu}
                  >
                    <LogIn className="mr-3 h-5 w-5" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-base font-medium transition-colors hover:text-primary flex items-center"
                    onClick={closeMenu}
                  >
                    <UserPlus className="mr-3 h-5 w-5" />
                    Register
                  </Link>
                </>
              )}

              {mounted && (
                <button
                  className="text-base font-medium transition-colors hover:text-primary text-left flex items-center"
                  onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark"
                    setTheme(newTheme)

                    // Manually update the class to avoid flash on next page load
                    if (newTheme === "dark") {
                      document.documentElement.classList.add("dark")
                    } else {
                      document.documentElement.classList.remove("dark")
                    }

                    closeMenu()
                  }}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="mr-3 h-5 w-5" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-3 h-5 w-5" />
                      Dark Mode
                    </>
                  )}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}


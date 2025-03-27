"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/types"

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInitialized: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Create a default context value for SSR
const defaultContextValue: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInitialized: false,
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Set mounted state and load cart data
  useEffect(() => {
    setMounted(true)

    // Try to load cart data from localStorage
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
      // Mark as initialized after loading data
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!mounted) return

    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems, mounted])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }

  // Add an event listener for the logout event
  useEffect(() => {
    if (!mounted) return

    const handleUserLogout = () => {
      clearCart()
    }

    window.addEventListener("user-logout", handleUserLogout)

    return () => {
      window.removeEventListener("user-logout", handleUserLogout)
    }
  }, [mounted])

  // Return default context during SSR to avoid hydration mismatch
  if (!mounted) {
    return <CartContext.Provider value={defaultContextValue}>{children}</CartContext.Provider>
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


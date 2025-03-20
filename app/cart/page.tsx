"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Trash, Plus, Minus, CreditCard, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { type CartItem, getCartItems, updateCartItem, removeCartItem } from "@/lib/api"
import RelatedProducts from "@/components/related-products"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [couponCode, setCouponCode] = useState<string>("")
  const [couponApplied, setCouponApplied] = useState<boolean>(false)

  // Fetch cart items on mount
  useEffect(() => {
    async function loadCart() {
      try {
        const items = await getCartItems()
        setCartItems(items)
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discount ? item.price - (item.price * item.discount) / 100 : item.price
    return sum + price * item.quantity
  }, 0)

  const shipping = subtotal > 100 ? 0 : 10
  const discount = couponApplied ? subtotal * 0.1 : 0
  const tax = (subtotal - discount) * 0.05
  const total = subtotal + shipping + tax - discount

  // Update item quantity
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity < 1) return
      const updatedCart = await updateCartItem(itemId, newQuantity)
      setCartItems(updatedCart)
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  // Remove item from cart
  const handleRemoveItem = async (itemId: string) => {
    try {
      const updatedCart = await removeCartItem(itemId)
      setCartItems(updatedCart)
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  // Apply coupon code
  const handleApplyCoupon = () => {
    // This would validate with backend in real app
    if (couponCode.toUpperCase() === "DISCOUNT10") {
      setCouponApplied(true)
    }
  }

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-muted rounded mb-8"></div>
          <div className="h-12 bg-muted rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/categories">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <Button variant="ghost" asChild className="flex items-center">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Items ({cartItems.length})</h2>
              <div className="divide-y">
                {cartItems.map((item) => {
                  const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price

                  return (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <Link href={`/products/${item.productId}`} className="block">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={120}
                              height={120}
                              className="rounded-md object-cover"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${item.productId}`}>
                            <h3 className="font-medium hover:underline">{item.name}</h3>
                          </Link>
                          <div className="text-sm text-muted-foreground mt-1 space-y-1">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.size && <p>Size: {item.size}</p>}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                            <div className="flex items-center">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center mx-1">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <div>
                                {item.discount ? (
                                  <div>
                                    <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                                    <span className="text-sm text-muted-foreground line-through ml-2">
                                      ${item.price.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-medium">${item.price.toFixed(2)}</span>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg shadow-sm border sticky top-20">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? <span className="text-green-600">Free</span> : <span>${shipping.toFixed(2)}</span>}
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Coupon Code */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button onClick={handleApplyCoupon} disabled={couponApplied || !couponCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {couponApplied && <p className="text-xs text-green-600 mt-1">Coupon applied successfully!</p>}
                </div>

                <Button size="lg" className="w-full mt-6">
                  <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center text-xs text-muted-foreground mt-4">
                  <Truck className="mr-1 h-4 w-4" />
                  <span>Free shipping on orders over $100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts category="Accessories" />
      </div>
    </div>
  )
}


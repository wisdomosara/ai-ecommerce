"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function CartPage() {
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [couponCode, setCouponCode] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Add loading state that will be set to false once component is mounted
  useEffect(() => {
    // Short timeout to ensure cart data is loaded from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/login?redirectTo=${encodeURIComponent("/cart")}`)
    } else {
      // Proceed with checkout
      router.push("/checkout")
    }
  }

  // Show skeleton while loading
  if (isLoading) {
    return <CartSkeleton />
  }

  return (
    <div className="container py-6 md:py-10">
      <h1 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold tracking-tight">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="p-4 md:p-6">
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">
                                <Link href={`/products/${item.id}`} className="hover:underline">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                +
                              </Button>
                            </div>

                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t p-4 md:p-6">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border">
              <div className="p-4 md:p-6">
                <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Shipping</p>
                    <p className="font-medium">${shipping.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p className="font-semibold">Total</p>
                      <p className="font-semibold">${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t p-4 md:p-6">
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border py-16">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/categories">Start Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Update the CartSkeleton function to better match the actual layout
function CartSkeleton() {
  return (
    <div className="container py-6 md:py-10">
      <Skeleton className="h-8 w-48 mb-6 md:mb-8" />

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4 md:p-6">
              <ul className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <Skeleton className="h-5 w-40 mb-2" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t p-4 md:p-6">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border">
            <div className="p-4 md:p-6">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t p-4 md:p-6">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


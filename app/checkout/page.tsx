"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { placeOrder } from "@/lib/orders"
import type { ShippingAddress, PaymentMethod } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, CreditCard, Truck } from "lucide-react"
import OrderSummary from "@/components/order-summary"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"

// Form validation schemas
const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Valid email is required"),
})

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  nameOnCard: z.string().min(2, "Name on card is required"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV is required"),
})

const checkoutSchema = z.object({
  shipping: shippingSchema,
  payment: paymentSchema,
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [isInitializing, setIsInitializing] = useState(true)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  // Initialize form with default values
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
        email: "",
      },
      payment: {
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
        cvv: "",
      },
    },
  })

  // Wait for cart and auth to be loaded before checking conditions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Handle redirects after initialization
  useEffect(() => {
    if (!isInitializing) {
      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        router.push(`/login?redirectTo=${encodeURIComponent("/checkout")}`)
        return
      }

      // Redirect to cart if cart is empty
      if (cartItems.length === 0) {
        router.push("/cart")
        return
      }
    }
  }, [isInitializing, isAuthenticated, cartItems.length, router])

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10 // Fixed shipping cost for now
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  // Handle form submission
  async function onSubmit(data: CheckoutFormValues) {
    if (!user) return

    setIsSubmitting(true)

    try {
      const order = await placeOrder(
        user.id,
        cartItems,
        data.shipping as ShippingAddress,
        data.payment as PaymentMethod,
      )

      // Clear the cart after successful order
      clearCart()

      // Show success state
      setOrderSuccess(true)
      setOrderId(order.id)

      // Show success toast
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id} has been placed.`,
        variant: "default",
      })

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle step navigation
  const nextStep = () => {
    if (step === "shipping") {
      // Validate shipping fields before proceeding
      const shippingData = form.getValues("shipping")
      const shippingResult = shippingSchema.safeParse(shippingData)

      if (shippingResult.success) {
        setStep("payment")
      } else {
        // Trigger validation errors
        if (!shippingResult.success) {
          const fieldErrors = shippingResult.error.formErrors.fieldErrors

          // Type-safe way to iterate through the errors
          Object.entries(fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(`shipping.${field}` as any, {
                type: "manual",
                message: errors[0],
              })
            }
          })
        }
      }
    }
  }

  const prevStep = () => {
    if (step === "payment") {
      setStep("shipping")
    }
  }

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="container py-6 md:py-10">
        <Skeleton className="h-10 w-1/3 mb-6 md:mb-8" />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Checkout steps skeleton */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-1 w-12" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-1 w-12" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Form skeleton */}
            <div className="rounded-lg border p-4 md:p-6">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`space-y-2 ${i <= 2 ? "md:col-span-2" : ""}`}>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  // Show success state
  if (orderSuccess && orderId) {
    return (
      <div className="container py-6 md:py-10 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Your order #{orderId} has been placed and is being processed. You will be redirected to the order
            confirmation page shortly.
          </p>
          <Skeleton className="h-2 w-full mb-1 mx-auto max-w-xs" />
          <Skeleton className="h-2 w-3/4 mx-auto max-w-xs" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 md:mb-8">Checkout</h1>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 hidden md:flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "shipping" || step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <Truck className="h-4 w-4" />
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <Separator className="w-12" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <Separator className="w-12" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>

          {/* Mobile step indicator */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h2 className="text-lg font-semibold">
              {step === "shipping" ? "Shipping Information" : "Payment Information"}
            </h2>
            <div className="text-sm text-muted-foreground">Step {step === "shipping" ? "1" : "2"} of 2</div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === "shipping" && (
                <div className="rounded-lg border p-4 md:p-6">
                  <h2 className="mb-4 text-xl font-semibold hidden md:block">Shipping Information</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="shipping.fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.addressLine1"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.addressLine2"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apt 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipping.phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="button" onClick={nextStep} className="w-full md:w-auto">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="rounded-lg border p-4 md:p-6">
                  <h2 className="mb-4 text-xl font-semibold hidden md:block">Payment Information</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="payment.cardNumber"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="4242 4242 4242 4242" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payment.nameOnCard"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payment.expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payment.cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex flex-col-reverse md:flex-row md:justify-between gap-3 md:gap-0">
                    <Button type="button" variant="outline" onClick={prevStep} className="w-full md:w-auto">
                      Back to Shipping
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>

        <div>
          <OrderSummary cartItems={cartItems} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
        </div>
      </div>
    </div>
  )
}


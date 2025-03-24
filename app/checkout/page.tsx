"use client"

import { useState } from "react"
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

  // Redirect to login if not authenticated
  if (typeof window !== "undefined" && !isAuthenticated) {
    router.push(`/login?redirectTo=${encodeURIComponent("/checkout")}`)
  }

  // Redirect to cart if cart is empty
  if (typeof window !== "undefined" && cartItems.length === 0) {
    router.push("/cart")
  }

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10 // Fixed shipping cost for now
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

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
      },
      payment: {
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
        cvv: "",
      },
    },
  })

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

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error("Error placing order:", error)
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

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === "shipping" && (
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>
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
                    <Button type="button" onClick={nextStep}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Payment Information</h2>
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
                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back to Shipping
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
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


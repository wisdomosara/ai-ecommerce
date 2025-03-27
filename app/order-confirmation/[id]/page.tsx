import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getOrderById } from "@/lib/orders"
import OrderSummary from "@/components/order-summary"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Order Confirmation",
  description: "Your order has been successfully placed",
}

interface OrderConfirmationPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  // Await the params Promise to get the actual id
  const resolvedParams = await params
  const id = resolvedParams.id

  // Fetch order details
  const order = await getOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          A confirmation email has been sent to{" "}
          <span className="font-medium">{order.shippingAddress.email || "your email address"}</span>.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Details</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Number</h3>
                <p className="mt-1 font-medium">{order.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Date</h3>
                <p className="mt-1">
                  {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Status</h3>
                <p className="mt-1 capitalize">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <p className="mt-1">Credit Card ({order.paymentMethod.cardNumber})</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Shipping Address</h3>
                <address className="not-italic">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.addressLine1}
                  <br />
                  {order.shippingAddress.addressLine2 && (
                    <>
                      {order.shippingAddress.addressLine2}
                      <br />
                    </>
                  )}
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                  <br />
                  {order.shippingAddress.phone}
                </address>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Billing Address</h3>
                <address className="not-italic">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.addressLine1}
                  <br />
                  {order.shippingAddress.addressLine2 && (
                    <>
                      {order.shippingAddress.addressLine2}
                      <br />
                    </>
                  )}
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                  <br />
                  {order.shippingAddress.phone}
                </address>
              </div>
            </div>
          </div>
        </div>

        <div>
          <OrderSummary
            cartItems={order.items}
            subtotal={order.subtotal}
            shipping={order.shipping}
            tax={order.tax}
            total={order.total}
          />

          <div className="mt-6 flex flex-col gap-4">
            <Button asChild>
              <Link href="/orders">View Your Orders</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


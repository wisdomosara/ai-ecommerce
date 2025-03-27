import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getOrderById } from "@/lib/orders"
import OrderSummary from "@/components/order-summary"
import OrderStatusBadge from "@/components/order-status-badge"
import OrderTimeline from "@/components/order-timeline"
import OrderActions from "@/components/order-actions"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return {
    title: `Order #${id} - ShopHub`,
    description: "View your order details and status",
  }
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params Promise to get the actual id
  const { id } = await params

  const order = await getOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/orders" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Order Details</h1>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">Order Timeline</h3>
                <OrderTimeline order={order} />
              </div>

              <Separator />

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
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Payment Information</h3>
                  <p>Credit Card ({order.paymentMethod.cardNumber})</p>
                  <p className="mt-1">{order.paymentMethod.nameOnCard}</p>
                  <p className="mt-1">Expires: {order.paymentMethod.expiryDate}</p>
                </div>
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

          {order.status !== "cancelled" && order.status !== "delivered" && (
            <div className="mt-6">
              <OrderActions orderId={order.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OrderStatusBadge from "@/components/order-status-badge"
import type { Order } from "@/lib/types"

interface OrdersTabProps {
  orders: Order[]
}

export default function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Orders</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/orders">View All Orders</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <OrderStatusBadge status={order.status} />
                  <Button asChild size="sm">
                    <Link href={`/orders/${order.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground">No orders found.</p>
        )}
      </CardContent>
    </Card>
  )
}


import { CheckCircle, Truck } from "lucide-react"
import type { Order } from "@/lib/types"

export default function OrderTimeline({ order }: { order: Order }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle className="h-3 w-3" />
        </div>
        <div>
          <p className="text-sm font-medium">Order Placed</p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {order.status !== "pending" && (
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle className="h-3 w-3" />
          </div>
          <div>
            <p className="text-sm font-medium">Processing Started</p>
            <p className="text-xs text-muted-foreground">
              {new Date(order.updatedAt).toLocaleDateString()} at {new Date(order.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}

      {order.status === "shipped" || order.status === "delivered" ? (
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle className="h-3 w-3" />
          </div>
          <div>
            <p className="text-sm font-medium">Shipped</p>
            <p className="text-xs text-muted-foreground">
              {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()} at{" "}
              {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Truck className="h-3 w-3" />
          </div>
          <div>
            <p className="text-sm font-medium">Shipping</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      )}

      {order.status === "delivered" ? (
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle className="h-3 w-3" />
          </div>
          <div>
            <p className="text-sm font-medium">Delivered</p>
            <p className="text-xs text-muted-foreground">
              {new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString()} at{" "}
              {new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CheckCircle className="h-3 w-3" />
          </div>
          <div>
            <p className="text-sm font-medium">Delivery</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      )}
    </div>
  )
}


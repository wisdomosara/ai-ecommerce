import Image from "next/image"
import Link from "next/link"
import type { CartItem } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  cartItems: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  showItemDetails?: boolean
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  showItemDetails = true,
}: OrderSummaryProps) {
  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

        {showItemDetails && (
          <div className="mb-4 max-h-80 overflow-auto">
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">
                      <Link href={`/products/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Shipping</p>
            <p className="font-medium">${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">Tax</p>
            <p className="font-medium">${tax.toFixed(2)}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}


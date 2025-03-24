"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cancelOrder } from "@/lib/actions"

export default function OrderActions({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelOrder = async () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setIsLoading(true)
      try {
        await cancelOrder(orderId)
        router.refresh() // Refresh the page to show updated status
      } catch (error) {
        console.error("Error cancelling order:", error)
        alert("Failed to cancel order. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleCancelOrder} disabled={isLoading}>
      {isLoading ? "Cancelling..." : "Cancel Order"}
    </Button>
  )
}


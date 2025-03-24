"use server"

import { revalidatePath } from "next/cache"

export async function cancelOrder(orderId: string) {
  // In a real app, this would make an API call to update the order status in the database
  console.log(`Cancelling order ${orderId}`)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the order page to show the updated status
  revalidatePath(`/orders/${orderId}`)
  revalidatePath("/orders")

  return { success: true }
}


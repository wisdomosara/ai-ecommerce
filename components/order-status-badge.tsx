import { Package, Truck, CheckCircle } from "lucide-react"

interface OrderStatusBadgeProps {
  status: string
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shipped":
        return <Truck className="h-3 w-3 mr-1" />
      case "delivered":
        return <CheckCircle className="h-3 w-3 mr-1" />
      default:
        return <Package className="h-3 w-3 mr-1" />
    }
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}


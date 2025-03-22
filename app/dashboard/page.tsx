import { Suspense } from "react"
import DashboardContent from "@/components/dashboard-content"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Dashboard - ShopHub",
  description: "Manage your account and orders",
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-64">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}


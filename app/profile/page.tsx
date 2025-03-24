import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cookies } from "next/headers"
import { getProductById } from "@/lib/data"
import { getMockOrders } from "@/lib/orders"
import ProfileTabs from "@/components/profile/profile-tabs"
import LogoutButton from "@/components/profile/logout-button"
import type { Product, Order } from "@/lib/types"

export const metadata = {
  title: "Your Profile - ShopHub",
  description: "Manage your account, orders, and saved items",
}

interface UserData {
  id: string
  name: string
  email: string
  role: string
  image?: string
  lastViewed?: string[]
  savedItems?: string[]
  orders?: Order[]
}

export default async function ProfilePage() {
  // Get user data from cookie - cookies() now returns a Promise in Next.js 15
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("shop_user")?.value
  const user: UserData | null = userCookie ? JSON.parse(userCookie) : null

  // Get last viewed products
  let lastViewedProducts: Product[] = []
  if (user?.lastViewed?.length) {
    lastViewedProducts = user.lastViewed
      .map((id: string) => getProductById(id))
      .filter((product: Product | undefined): product is Product => product !== undefined)
  }

  // Get saved products
  let savedProducts: Product[] = []
  if (user?.savedItems?.length) {
    savedProducts = user.savedItems
      .map((id: string) => getProductById(id))
      .filter((product: Product | undefined): product is Product => product !== undefined)
  }

  // Get recent orders
  const allOrders = await getMockOrders()
  const recentOrders = allOrders.slice(0, 2) // Just show the 2 most recent orders

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image} alt={user?.name || "User"} />
            <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
            <p className="text-muted-foreground">{user?.email || "No email"}</p>
          </div>
          <LogoutButton className="ml-auto" />
        </div>

        {/* Profile Content */}
        <ProfileTabs
          recentOrders={recentOrders}
          savedProducts={savedProducts}
          lastViewedProducts={lastViewedProducts}
        />
      </div>
    </div>
  )
}


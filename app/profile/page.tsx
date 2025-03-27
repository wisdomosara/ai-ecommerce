import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cookies } from "next/headers"
import LogoutButton from "@/components/profile/logout-button"
import { ProfileTabs } from "@/components/profile/profile-tabs"

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
  orders?: string[]
}

export default async function ProfilePage() {
  // Get user data from cookie
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("shop_user")?.value
  const user: UserData | null = userCookie ? JSON.parse(userCookie) : null

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <Avatar className="h-16 w-16 md:h-20 md:w-20">
            <AvatarImage src={user?.image} alt={user?.name || "User"} />
            <AvatarFallback className="text-xl md:text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold">{user?.name || "User"}</h1>
            <p className="text-muted-foreground">{user?.email || "No email"}</p>
          </div>
          <LogoutButton className="mt-4 md:mt-0 md:ml-auto" />
        </div>

        {/* Profile Content - now we're not passing any pre-fetched data */}
        <ProfileTabs />
      </div>
    </div>
  )
}


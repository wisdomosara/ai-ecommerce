"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { OrdersTab } from "@/components/profile/orders-tab"
import { useAuth } from "@/components/auth-provider"
import { SavedItemsTab } from "@/components/profile/saved-items-tab" // Add this import

export function ProfileTabs() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("account")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ProfileTabsSkeleton />
  }

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Account Information</h3>
                <p className="text-sm text-muted-foreground">Manage your account details</p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <div className="font-medium">Name</div>
                  <div>{user?.name}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Email</div>
                  <div>{user?.email}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Role</div>
                  <div className="capitalize">{user?.role}</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <SavedItemsTab savedItemIds={user?.savedItems || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileTabsSkeleton() {
  return (
    <div className="w-full p-4 space-y-6">
      <div className="h-10 bg-muted rounded-md w-full max-w-md"></div>
      <div className="border rounded-lg p-6 space-y-4">
        <div className="h-6 bg-muted rounded-md w-1/4"></div>
        <div className="h-4 bg-muted rounded-md w-3/4"></div>
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded-md w-1/5"></div>
              <div className="h-4 bg-muted rounded-md w-2/5"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


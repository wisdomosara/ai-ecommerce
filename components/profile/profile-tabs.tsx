"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Package, Clock } from "lucide-react"
import ProductCard from "@/components/product-card"
import OrdersTab from "@/components/profile/orders-tab"
import { useAuth } from "@/components/auth-provider"
import type { Product, Order } from "@/lib/types"

interface ProfileTabsProps {
  recentOrders: Order[]
  savedProducts: Product[]
  lastViewedProducts: Product[]
}

export default function ProfileTabs({ recentOrders, savedProducts, lastViewedProducts }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("orders")
  const { updateUser } = useAuth()

  const handleRemoveSavedItem = (productId: string) => {
    updateUser({
      savedItems: savedProducts.filter((product) => product.id !== productId).map((product) => product.id),
    })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-3 w-full md:w-auto">
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span className="hidden md:inline">Orders</span>
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden md:inline">Saved Items</span>
        </TabsTrigger>
        <TabsTrigger value="recently-viewed" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden md:inline">Recently Viewed</span>
        </TabsTrigger>
      </TabsList>

      {/* Orders Tab */}
      <TabsContent value="orders" className="space-y-4">
        <OrdersTab orders={recentOrders} />
      </TabsContent>

      {/* Saved Items Tab */}
      <TabsContent value="saved" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Saved Items</h2>
          {savedProducts.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => updateUser({ savedItems: [] })}>
              Clear All
            </Button>
          )}
        </div>

        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveSavedItem(product.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">You haven't saved any items yet.</p>
              <Button asChild className="mt-4">
                <Link href="/categories">Explore Products</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Recently Viewed Tab */}
      <TabsContent value="recently-viewed" className="space-y-6">
        <h2 className="text-xl font-semibold">Recently Viewed</h2>
        {lastViewedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lastViewedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">You haven't viewed any products yet.</p>
              <Button asChild className="mt-4">
                <Link href="/categories">Explore Products</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}


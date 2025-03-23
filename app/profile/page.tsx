"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { getProductById } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Heart, Package, Clock, LogOut } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const [lastViewedProducts, setLastViewedProducts] = useState<Product[]>([])
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState("orders")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirectTo=/profile")
      return
    }

    setIsLoading(true)

    // Load user data only once
    if (user) {
      // Load last viewed products
      if (user.lastViewed?.length) {
        const products = user.lastViewed
          .map((id) => getProductById(id))
          .filter((product): product is Product => product !== undefined)
        setLastViewedProducts(products)
      }

      // Load saved products
      if (user.savedItems?.length) {
        const products = user.savedItems
          .map((id) => getProductById(id))
          .filter((product): product is Product => product !== undefined)
        setSavedProducts(products)
      }
    }

    setIsLoading(false)
  }, [isAuthenticated, router, user])

  if (!isAuthenticated || !user) {
    return null
  }

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-1234",
      date: "2023-05-15",
      status: "Delivered",
      total: 129.99,
      items: [{ id: "1", name: "Wireless Bluetooth Headphones", price: 129.99, quantity: 1 }],
    },
    {
      id: "ORD-5678",
      date: "2023-06-02",
      status: "Processing",
      total: 89.99,
      items: [{ id: "2", name: "Smart Fitness Watch", price: 89.99, quantity: 1 }],
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" className="ml-auto" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Tabs */}
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
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Orders</h2>
            {mockOrders.length > 0 ? (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">Order #{order.id}</CardTitle>
                          <CardDescription>Placed on {order.date}</CardDescription>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}
                          >
                            {order.status}
                          </span>
                          <p className="mt-1 font-medium">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="divide-y">
                        {order.items.map((item) => (
                          <li key={item.id} className="py-2 flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p>${item.price.toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          View Order Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                  <Button asChild className="mt-4">
                    <Link href="/categories">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-xl font-semibold">Saved Items</h2>
            {savedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {savedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
      </div>
    </div>
  )
}


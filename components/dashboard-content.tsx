"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Users,
  CreditCard,
  BarChart3,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardContent() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMobile()

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="container py-10">
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        {(!isMobile || sidebarOpen) && (
          <div className={`${isMobile ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : ""}`}>
            <div
              className={`${isMobile ? "fixed left-0 top-0 z-50 h-full w-3/4 max-w-xs border-r bg-background p-4 shadow-lg mobile-sidebar" : "w-64"}`}
            >
              {isMobile && (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Dashboard</h2>
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
              <div className="space-y-4">
                <div className="py-1">
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === "overview" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("overview")
                        if (isMobile) setSidebarOpen(false)
                      }}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Overview
                    </Button>
                    <Button
                      variant={activeTab === "orders" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("orders")
                        if (isMobile) setSidebarOpen(false)
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    <Button
                      variant={activeTab === "products" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("products")
                        if (isMobile) setSidebarOpen(false)
                      }}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Products
                    </Button>
                    <Button
                      variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("wishlist")
                        if (isMobile) setSidebarOpen(false)
                      }}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab("settings")
                        if (isMobile) setSidebarOpen(false)
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            {isMobile && <div className="fixed inset-0 z-40" onClick={toggleSidebar} />}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className={`${isMobile ? "hidden" : "grid"} w-full grid-cols-5`}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] w-full bg-muted flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">Customer {i + 1}</p>
                              <p className="text-sm text-muted-foreground">customer{i + 1}@example.com</p>
                            </div>
                            <div className="ml-auto font-medium">+${(Math.random() * 100).toFixed(2)}</div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>View and manage your orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">No orders found.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>View and manage your products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">No products found.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>View and manage your wishlist.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">No items in your wishlist.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm">{user?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-sm capitalize">{user?.role}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


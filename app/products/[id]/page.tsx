import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Star, Truck, RotateCcw, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductSwiper from "@/components/product-swiper"
import RelatedProducts from "@/components/related-products"

// This would come from your database in a real app
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description:
        "A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear, this t-shirt features a classic fit and is available in multiple colors.",
      price: 29.99,
      category: "Men's Fashion",
      subcategory: "T-shirts",
      brand: "StyleBasics",
      images: [
        { src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Front", alt: "Casual Cotton T-Shirt - Front" },
        { src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Back", alt: "Casual Cotton T-Shirt - Back" },
        { src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Detail", alt: "Casual Cotton T-Shirt - Detail" },
        { src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Fabric", alt: "Casual Cotton T-Shirt - Fabric" },
      ],
      colors: ["Black", "White", "Navy", "Gray", "Red"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rating: 4.5,
      reviewCount: 128,
      stock: 50,
      sku: "TS-001-BLK",
      features: ["100% organic cotton", "Classic fit", "Crew neck", "Short sleeves", "Machine washable"],
      specifications: {
        Material: "100% Organic Cotton",
        Fit: "Classic",
        Neck: "Crew",
        Sleeve: "Short",
        Care: "Machine wash cold, tumble dry low",
      },
    },
    // More products would be here
  ]

  return products.find((product) => product.id === id)
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/categories" className="text-muted-foreground hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/categories/${product.category.toLowerCase().replace("'", "").replace(" ", "-")}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <ProductSwiper images={product.images} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>

            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="relative w-10 h-10 rounded-full border-2 border-transparent hover:border-primary cursor-pointer flex items-center justify-center"
                      style={{ backgroundColor: color.toLowerCase() === "white" ? "#ffffff" : color.toLowerCase() }}
                      title={color}
                    >
                      {color.toLowerCase() === "black" && (
                        <div className="absolute inset-0.5 rounded-full border border-white/20"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center justify-center h-10 border rounded text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <Link href="#size-guide" className="text-sm text-primary hover:underline mt-2 inline-block">
                  Size Guide
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32">
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                  {product.stock > 10 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-amber-600">Only {product.stock} left</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="sm:flex-1">
                  Add to Cart
                </Button>
                <Button size="lg" variant="secondary" className="sm:flex-1">
                  Buy Now
                </Button>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30 day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Protected by encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2">
                    <span className="font-medium">{key}:</span> <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts category={product.category} excludeId={product.id} />
      </div>
    </div>
  )
}


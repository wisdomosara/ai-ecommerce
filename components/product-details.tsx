"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Minus,
  Plus,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductSwiper from "@/components/product-swiper";
import RelatedProducts from "@/components/related-products";
import { type Product, addToCart } from "@/lib/api";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart(
        product.id,
        quantity,
        selectedColor || undefined,
        selectedSize || undefined
      );
      // Could show a success toast here
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Could show an error toast here
    } finally {
      setIsAddingToCart(false);
    }
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6 overflow-x-auto pb-2">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground shrink-0" />
        <Link
          href="/categories"
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground shrink-0" />
        <Link
          href={`/categories/${product.category
            .toLowerCase()
            .replace("'", "")
            .replace(" ", "-")}`}
          className="text-muted-foreground hover:text-foreground whitespace-nowrap"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground shrink-0" />
        <span className="font-medium truncate max-w-[150px] md:max-w-none whitespace-nowrap">
          {product.name}
        </span>
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
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
              {product.sku && (
                <>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount && (
                <span className="text-lg text-muted-foreground line-through ml-3">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="ml-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="space-y-6">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`relative w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${
                          selectedColor === color
                            ? "ring-2 ring-primary ring-offset-2"
                            : "border border-muted"
                        }`}
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.toLowerCase() === "black"
                              ? "#000000"
                              : color.toLowerCase(),
                        }}
                        title={color}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color.toLowerCase() === "white" && (
                          <div className="absolute inset-0.5 rounded-full border border-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <div
                        key={size}
                        className={`flex items-center justify-center h-10 border rounded text-sm cursor-pointer ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="#size-guide"
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    Size Guide
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {product.stock ? (
                    product.stock > 10 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-amber-600">
                        Only {product.stock} left
                      </span>
                    )
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="sm:flex-1"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product.stock}
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button size="lg" variant="secondary" className="sm:flex-1">
                  <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                </Button>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      30 day return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">
                      Protected by encryption
                    </p>
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
              {product.features ? (
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No features available for this product.
                </p>
              )}
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              {product.specifications ? (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="py-2">
                        <span className="font-medium">{key}:</span>{" "}
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No specifications available for this product.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts
          category={product.category}
          excludeId={product.id.toString()}
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Filter } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// This would come from your database or API
const categories = [
  { name: "Women's Fashion", slug: "womens-fashion" },
  { name: "Men's Fashion", slug: "mens-fashion" },
  { name: "Accessories", slug: "accessories" },
  { name: "Footwear", slug: "footwear" },
  { name: "Beauty", slug: "beauty" },
  { name: "Home & Living", slug: "home-living" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = categories.find((cat) => cat?.slug === categoryParam);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: category.name,
    description: `Browse our collection of ${category.name.toLowerCase()} products.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;

  const category = categories?.find((cat) => cat?.slug === categoryParam);

  if (!category) {
    notFound();
  }

  // Mock products for this category
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `${category.name} Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 19.99,
    image: `/placeholder.svg?height=400&width=400`,
  }));

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href="/categories"
          className="text-muted-foreground hover:text-foreground"
        >
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">{category.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Would be expanded in a real app */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2" />
                    <label htmlFor="price-1" className="text-sm">
                      Under $25
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2" />
                    <label htmlFor="price-2" className="text-sm">
                      $25 - $50
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2" />
                    <label htmlFor="price-3" className="text-sm">
                      $50 - $100
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2" />
                    <label htmlFor="price-4" className="text-sm">
                      $100 - $200
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-5" className="mr-2" />
                    <label htmlFor="price-5" className="text-sm">
                      $200 & Above
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Colors */}
              <div>
                <h3 className="font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Black",
                    "White",
                    "Red",
                    "Blue",
                    "Green",
                    "Yellow",
                    "Purple",
                    "Pink",
                  ].map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border cursor-pointer hover:ring-2 ring-primary ring-offset-2"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* Size */}
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <div
                      key={size}
                      className="flex items-center justify-center h-8 border rounded text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">{category.name}</h1>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="best-selling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <Link
                  href={`/products/${product.id}`}
                  className="relative block aspect-square"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium hover:underline line-clamp-2"
                  >
                    {product.name}
                  </Link>
                  <p className="text-lg font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <span className="mx-1">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8">
                10
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

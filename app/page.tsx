import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"
import CategoryGrid from "@/components/category-grid"
import CollectionShowcase from "@/components/collection-showcase"
import NewArrivals from "@/components/new-arrivals"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />

        {/* Categories Section */}
        <section className="py-12 px-4 md:px-6 lg:py-16">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
              <Link href="/categories" className="flex items-center text-sm font-medium text-primary">
                View all categories <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4 md:px-6 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Products</h2>
            <FeaturedProducts />
          </div>
        </section>

        {/* Collections */}
        <section className="py-12 px-4 md:px-6 lg:py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Collections</h2>
            <CollectionShowcase />
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 px-4 md:px-6 bg-muted/50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
              <Button variant="outline" asChild>
                <Link href="/new-arrivals">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <NewArrivals />
          </div>
        </section>

        {/* Deals Section */}
        <section className="py-12 px-4 md:px-6 lg:py-16">
          <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-indigo-700 p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    Get up to 50% off on selected items. Limited time offer.
                  </p>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/deals">Shop Now</Link>
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Summer Sale"
                    width={300}
                    height={300}
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 px-4 md:px-6 bg-muted">
          <div className="container mx-auto">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground mb-6">Stay updated with our latest offers and products</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Become a Seller */}
        <section className="py-12 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Become a Seller on StyleStore</h3>
              <p className="mb-6">
                Join our marketplace and reach millions of customers. Start selling your products today.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sell">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import NewArrivals from "@/components/new-arrivals"
import DealsSection from "@/components/deals-section"
import CollectionsShowcase from "@/components/collections-showcase"
import CategoriesShowcase from "@/components/categories-showcase"
import TrendingProducts from "@/components/trending-products"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6 md:gap-16 md:py-10">
      <HeroSection />

      <section className="px-4 md:container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">New Arrivals</h2>
        </div>
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <NewArrivals />
        </Suspense>
      </section>

      <section className="px-4 md:container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Deals of the Week</h2>
        </div>
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <DealsSection />
        </Suspense>
      </section>

      <section className="px-4 md:container">
        <Suspense fallback={<CollectionsSkeleton />}>
          <CollectionsShowcase title="Collections" navigationButtons={true} />
        </Suspense>
      </section>

      <section className="px-4 md:container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Categories</h2>
        </div>
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesShowcase />
        </Suspense>
      </section>

      <section className="px-4 md:container">
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <TrendingProducts title="Trending Products" navigationButtons={true} />
        </Suspense>
      </section>
    </div>
  )
}

function ProductsSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
    </div>
  )
}

function CollectionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[250px] w-full rounded-xl" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        ))}
    </div>
  )
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[120px] w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        ))}
    </div>
  )
}


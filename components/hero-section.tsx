import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Hero Background */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=600&width=1200" alt="Hero Image" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-lg space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Discover Your Style</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our latest collections and find the perfect pieces to express your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/categories">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/collections">View Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


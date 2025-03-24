import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-xl bg-muted/10">
        <div className="relative z-10 flex flex-col items-start justify-center gap-4 py-10 px-6 md:px-10 md:gap-6 md:py-24 lg:py-32">
          <div className="space-y-4 text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Discover the Latest Trends</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Shop the newest styles and collections from top brands at unbeatable prices.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <Link href="/categories">Shop Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <Link href="/collections">View Collections</Link>
            </Button>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Hero background"
          width={1600}
          height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          priority
        />
      </div>
    </section>
  )
}


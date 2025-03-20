import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CollectionShowcase() {
  const collections = [
    {
      id: 1,
      name: "Summer Essentials",
      description: "Stay cool and stylish with our summer collection",
      image: "/placeholder.svg?height=500&width=800",
      slug: "summer-essentials",
    },
    {
      id: 2,
      name: "Workwear Edit",
      description: "Professional attire for the modern workplace",
      image: "/placeholder.svg?height=500&width=800",
      slug: "workwear-edit",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {collections.map((collection) => (
        <div key={collection.id} className="relative overflow-hidden rounded-xl group">
          <div className="aspect-[16/9] relative">
            <Image
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
            <p className="text-white/90 mb-4">{collection.description}</p>
            <Button asChild>
              <Link href={`/collections/${collection.slug}`}>
                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


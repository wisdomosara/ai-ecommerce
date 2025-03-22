import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Collection } from "@/lib/types"

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="aspect-[16/9] w-full overflow-hidden relative">
          <Image
            src={collection.image || "/placeholder.svg"}
            alt={collection.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-xl font-medium text-white">{collection.name}</h3>
            <p className="text-sm text-white/80 mt-1">{collection.productCount} products</p>
            <div className="flex items-center mt-2 text-white/90 text-sm font-medium">
              <span>View Collection</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


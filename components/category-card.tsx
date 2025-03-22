import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="aspect-[4/5] w-full overflow-hidden relative">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            width={300}
            height={375}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h3 className="w-full text-center font-medium text-white p-4 text-lg">{category.name}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}


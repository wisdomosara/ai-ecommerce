import Link from "next/link"
import Image from "next/image"

export default function CategoryGrid() {
  const categories = [
    { name: "Women's Fashion", slug: "womens-fashion", image: "/placeholder.svg?height=300&width=300" },
    { name: "Men's Fashion", slug: "mens-fashion", image: "/placeholder.svg?height=300&width=300" },
    { name: "Accessories", slug: "accessories", image: "/placeholder.svg?height=300&width=300" },
    { name: "Footwear", slug: "footwear", image: "/placeholder.svg?height=300&width=300" },
    { name: "Beauty", slug: "beauty", image: "/placeholder.svg?height=300&width=300" },
    { name: "Home & Living", slug: "home-living", image: "/placeholder.svg?height=300&width=300" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square relative">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white font-medium text-lg text-center px-2">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}


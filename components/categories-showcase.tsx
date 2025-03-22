import CategoryCard from "@/components/category-card"
import { categories } from "@/lib/data"

export default function CategoriesShowcase() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}


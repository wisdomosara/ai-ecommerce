import ProductCard from "@/components/product-card"
import { getNewArrivals } from "@/lib/data"

export default function NewArrivals() {
  const products = getNewArrivals()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}


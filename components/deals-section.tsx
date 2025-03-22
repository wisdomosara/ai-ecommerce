import ProductCard from "@/components/product-card"
import { getDeals } from "@/lib/data"

export default function DealsSection() {
  const products = getDeals()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}


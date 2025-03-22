import { notFound } from "next/navigation"
import { getProductById } from "@/lib/data"
import ProductDetail from "@/components/product-detail"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: "Product Not Found - ShopHub",
      description: "The requested product could not be found",
    }
  }

  return {
    title: `${product.name} - ShopHub`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}


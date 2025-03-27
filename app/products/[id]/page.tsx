import { ProductDetail } from "@/components/product-detail"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params Promise to get the actual id
  const resolvedParams = await params
  console.log("Resolved params:", resolvedParams)

  const product = getProductById(resolvedParams.id)
  console.log("Product found:", !!product)

  if (!product) {
    console.log("Product not found, returning 404")
    notFound()
  }

  return <ProductDetail product={product} />
}


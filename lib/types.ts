export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount: number
  images: string[]
  category: string
  categorySlug: string
  collection?: string
  collectionSlug?: string
  isNew: boolean
  isFeatured: boolean
  rating: number
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  productCount: number
}

export interface Collection {
  id: string
  name: string
  slug: string
  image: string
  description: string
  productCount: number
}


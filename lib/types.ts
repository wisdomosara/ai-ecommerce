export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number | undefined
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

export interface CartItem extends Product {
  quantity: number
}

export interface ShippingAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface PaymentMethod {
  cardNumber: string
  nameOnCard: string
  expiryDate: string
  cvv: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}


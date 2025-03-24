import type { Order, ShippingAddress, PaymentMethod, CartItem } from "./types"

// Mock function to simulate placing an order
export async function placeOrder(
  userId: string,
  items: CartItem[],
  shippingAddress: ShippingAddress,
  paymentMethod: PaymentMethod,
): Promise<Order> {
  // Calculate order totals
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10 // Fixed shipping cost for now
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  // In a real app, this would make an API call to create the order in the database
  // For now, we'll just create a mock order object
  const order: Order = {
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    shipping,
    tax,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return order
}

// Function to get order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  // In a real app, this would fetch the order from the database
  // For now, we'll create a mock order

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Create a mock order
  const mockOrder: Order = {
    id: orderId,
    userId: "user123",
    items: [
      {
        id: "prod1",
        name: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        discount: 10,
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        categorySlug: "electronics",
        isNew: true,
        isFeatured: true,
        rating: 4.8,
        stock: 15,
        quantity: 1,
      },
      {
        id: "prod2",
        name: "Wireless Charger",
        description: "Fast wireless charging pad compatible with all devices",
        price: 49.99,
        discount: 0,
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        categorySlug: "electronics",
        isNew: false,
        isFeatured: true,
        rating: 4.5,
        stock: 30,
        quantity: 2,
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      addressLine1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "123-456-7890",
    },
    paymentMethod: {
      cardNumber: "•••• •••• •••• 4242",
      nameOnCard: "John Doe",
      expiryDate: "12/25",
      cvv: "***",
    },
    subtotal: 299.97,
    shipping: 10,
    tax: 24.0,
    total: 333.97,
    status: "processing",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  }

  return mockOrder
}

// Function to get all orders for a user
export async function getMockOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: "ORD-1234",
      userId: "user123",
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          description: "High-quality sound with noise cancellation technology.",
          price: 129.99,
          discount: 10,
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Electronics",
          categorySlug: "electronics",
          isNew: true,
          isFeatured: true,
          rating: 4.5,
          stock: 45,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        addressLine1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "United States",
        phone: "123-456-7890",
      },
      paymentMethod: {
        cardNumber: "•••• •••• •••• 4242",
        nameOnCard: "John Doe",
        expiryDate: "12/25",
        cvv: "***",
      },
      subtotal: 129.99,
      shipping: 10,
      tax: 10.4,
      total: 150.39,
      status: "delivered",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days ago
    },
    {
      id: "ORD-5678",
      userId: "user123",
      items: [
        {
          id: "2",
          name: "Smart Fitness Watch",
          description: "Track your fitness goals with this advanced smartwatch.",
          price: 89.99,
          discount: 0,
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Electronics",
          categorySlug: "electronics",
          isNew: true,
          isFeatured: false,
          rating: 4.2,
          stock: 32,
          quantity: 1,
        },
        {
          id: "5",
          name: "Professional Yoga Mat",
          description: "Non-slip yoga mat for all types of yoga.",
          price: 29.99,
          discount: 0,
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Sports",
          categorySlug: "sports",
          isNew: false,
          isFeatured: true,
          rating: 4.8,
          stock: 28,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        addressLine1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "United States",
        phone: "123-456-7890",
      },
      paymentMethod: {
        cardNumber: "•••• •••• •••• 4242",
        nameOnCard: "John Doe",
        expiryDate: "12/25",
        cvv: "***",
      },
      subtotal: 119.98,
      shipping: 10,
      tax: 9.6,
      total: 139.58,
      status: "shipped",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    },
    {
      id: "ORD-9012",
      userId: "user123",
      items: [
        {
          id: "9",
          name: "Mechanical Keyboard",
          description: "Premium mechanical keyboard with RGB lighting.",
          price: 79.99,
          discount: 0,
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Electronics",
          categorySlug: "electronics",
          isNew: true,
          isFeatured: true,
          rating: 4.7,
          stock: 25,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: "John Doe",
        addressLine1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "United States",
        phone: "123-456-7890",
      },
      paymentMethod: {
        cardNumber: "•••• •••• •••• 4242",
        nameOnCard: "John Doe",
        expiryDate: "12/25",
        cvv: "***",
      },
      subtotal: 79.99,
      shipping: 10,
      tax: 6.4,
      total: 96.39,
      status: "processing",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
  ]

  return mockOrders
}


export interface Product {
  id: number | string
  name: string
  price: number
  description?: string
  category: string
  subcategory?: string
  brand?: string
  images: ProductImage[]
  colors?: string[]
  sizes?: string[]
  rating?: number
  reviewCount?: number
  stock?: number
  sku?: string
  features?: string[]
  specifications?: Record<string, string>
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
}

export interface ProductImage {
  src: string
  alt: string
}

export interface CartItem {
  id: number | string
  productId: number | string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
  discount?: number
}

// Dummy data
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Casual Cotton T-Shirt",
    price: 29.99,
    description:
      "A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear, this t-shirt features a classic fit and is available in multiple colors.",
    category: "Men's Fashion",
    subcategory: "T-shirts",
    brand: "StyleBasics",
    images: [
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
        alt: "Casual Cotton T-Shirt - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",
        alt: "Casual Cotton T-Shirt - Back",
      },
      {
        src: "https://images.unsplash.com/photo-1565128939020-a8a76c3dde92?w=600&h=600&fit=crop",
        alt: "Casual Cotton T-Shirt - Detail",
      },
    ],
    colors: ["Black", "White", "Navy", "Gray", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    sku: "TS-001-BLK",
    features: ["100% organic cotton", "Classic fit", "Crew neck", "Short sleeves", "Machine washable"],
    specifications: {
      Material: "100% Organic Cotton",
      Fit: "Classic",
      Neck: "Crew",
      Sleeve: "Short",
      Care: "Machine wash cold, tumble dry low",
    },
    isFeatured: true,
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    price: 59.99,
    description:
      "A beautiful floral dress perfect for summer days. Made with lightweight fabric for comfort in warm weather.",
    category: "Women's Fashion",
    subcategory: "Dresses",
    brand: "FloralChic",
    images: [
      {
        src: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop",
        alt: "Summer Floral Dress - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
        alt: "Summer Floral Dress - Back",
      },
      {
        src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop",
        alt: "Summer Floral Dress - Detail",
      },
    ],
    colors: ["Blue", "Pink", "Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.3,
    reviewCount: 87,
    stock: 25,
    sku: "DR-002-BLU",
    features: ["Lightweight fabric", "Floral print", "V-neck", "Midi length", "Machine washable"],
    specifications: {
      Material: "95% Polyester, 5% Elastane",
      Length: "Midi",
      Neck: "V-neck",
      Pattern: "Floral",
      Care: "Machine wash cold, line dry",
    },
    discount: 10,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    description: "A stylish and practical leather crossbody bag with multiple compartments for all your essentials.",
    category: "Accessories",
    subcategory: "Bags",
    brand: "LuxeLeather",
    images: [
      {
        src: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=600&fit=crop",
        alt: "Leather Crossbody Bag - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop",
        alt: "Leather Crossbody Bag - Open",
      },
      {
        src: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
        alt: "Leather Crossbody Bag - Side",
      },
    ],
    colors: ["Black", "Brown", "Tan"],
    rating: 4.7,
    reviewCount: 56,
    stock: 15,
    sku: "BG-003-BLK",
    features: [
      "Genuine leather",
      "Adjustable strap",
      "Multiple compartments",
      "Secure zip closure",
      "Interior pockets",
    ],
    specifications: {
      Material: "100% Genuine Leather",
      Dimensions: '9" x 6" x 2"',
      "Strap Length": 'Adjustable up to 22"',
      Closure: "Zipper",
      Care: "Spot clean with leather cleaner",
    },
    isFeatured: true,
  },
  {
    id: 4,
    name: "Classic Denim Jacket",
    price: 89.99,
    description:
      "A timeless denim jacket that adds a cool edge to any outfit. Made with premium denim for durability and comfort.",
    category: "Men's Fashion",
    subcategory: "Jackets",
    brand: "DenimDeluxe",
    images: [
      {
        src: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=600&fit=crop",
        alt: "Classic Denim Jacket - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
        alt: "Classic Denim Jacket - Back",
      },
      {
        src: "https://images.unsplash.com/photo-1591047139756-45659f5a7fec?w=600&h=600&fit=crop",
        alt: "Classic Denim Jacket - Detail",
      },
    ],
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.4,
    reviewCount: 102,
    stock: 30,
    sku: "JK-004-BLU",
    features: ["Premium denim", "Button closure", "Multiple pockets", "Classic collar", "Machine washable"],
    specifications: {
      Material: "100% Cotton Denim",
      Fit: "Regular",
      Closure: "Button",
      Sleeve: "Long",
      Care: "Machine wash cold, tumble dry low",
    },
    discount: 15,
    isFeatured: true,
  },
  {
    id: 101,
    name: "Oversized Graphic Tee",
    price: 34.99,
    description: "An oversized t-shirt featuring a unique graphic print. Perfect for creating a stylish, casual look.",
    category: "Women's Fashion",
    subcategory: "T-shirts",
    brand: "UrbanEdge",
    images: [
      {
        src: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&h=600&fit=crop",
        alt: "Oversized Graphic Tee - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=600&h=600&fit=crop",
        alt: "Oversized Graphic Tee - Back",
      },
      {
        src: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&h=600&fit=crop",
        alt: "Oversized Graphic Tee - Detail",
      },
    ],
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.2,
    reviewCount: 45,
    stock: 40,
    sku: "TS-101-BLK",
    features: ["100% cotton", "Oversized fit", "Unique graphic print", "Crew neck", "Machine washable"],
    specifications: {
      Material: "100% Cotton",
      Fit: "Oversized",
      Neck: "Crew",
      Sleeve: "Short",
      Care: "Machine wash cold, tumble dry low",
    },
    isNew: true,
  },
  {
    id: 102,
    name: "Slim Fit Chino Pants",
    price: 49.99,
    description:
      "Classic slim fit chino pants that are versatile and comfortable. Perfect for casual or smart-casual occasions.",
    category: "Men's Fashion",
    subcategory: "Pants",
    brand: "ModernMens",
    images: [
      {
        src: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
        alt: "Slim Fit Chino Pants - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop",
        alt: "Slim Fit Chino Pants - Side",
      },
      {
        src: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&h=600&fit=crop",
        alt: "Slim Fit Chino Pants - Detail",
      },
    ],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.3,
    reviewCount: 78,
    stock: 35,
    sku: "PT-102-KHK",
    features: ["Cotton blend", "Slim fit", "Button and zip closure", "Multiple pockets", "Machine washable"],
    specifications: {
      Material: "98% Cotton, 2% Elastane",
      Fit: "Slim",
      Closure: "Button and zip",
      Length: "Full length",
      Care: "Machine wash cold, tumble dry low",
    },
    isNew: true,
  },
  {
    id: 103,
    name: "Minimalist Watch",
    price: 129.99,
    description: "A sleek minimalist watch with a leather strap. Adds a touch of elegance to any outfit.",
    category: "Accessories",
    subcategory: "Watches",
    brand: "TimeEssence",
    images: [
      {
        src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop",
        alt: "Minimalist Watch - Front",
      },
      {
        src: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop",
        alt: "Minimalist Watch - Side",
      },
      {
        src: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&h=600&fit=crop",
        alt: "Minimalist Watch - Detail",
      },
    ],
    colors: ["Black/Silver", "Brown/Gold", "Navy/Silver"],
    rating: 4.8,
    reviewCount: 32,
    stock: 10,
    sku: "WT-103-BLK",
    features: [
      "Quartz movement",
      "Genuine leather strap",
      "Stainless steel case",
      "Water resistant (30m)",
      "Minimalist design",
    ],
    specifications: {
      Movement: "Japanese Quartz",
      "Case Material": "Stainless Steel",
      "Case Diameter": "40mm",
      "Band Material": "Genuine Leather",
      "Water Resistance": "30m / 3 ATM",
    },
    isNew: true,
    discount: 15,
  },
  {
    id: 104,
    name: "Canvas Sneakers",
    price: 59.99,
    description: "Classic canvas sneakers that go with everything. Comfortable for all-day wear.",
    category: "Footwear",
    subcategory: "Sneakers",
    brand: "StrideStyle",
    images: [
      {
        src: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&h=600&fit=crop",
        alt: "Canvas Sneakers - Pair",
      },
      {
        src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
        alt: "Canvas Sneakers - Side",
      },
      {
        src: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop",
        alt: "Canvas Sneakers - Detail",
      },
    ],
    colors: ["White", "Black", "Navy", "Red"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.5,
    reviewCount: 95,
    stock: 50,
    sku: "SN-104-WHT",
    features: ["Canvas upper", "Rubber sole", "Lace-up closure", "Cushioned insole", "Breathable lining"],
    specifications: {
      "Upper Material": "Canvas",
      "Sole Material": "Rubber",
      Closure: "Lace-up",
      "Heel Height": "1 inch",
      Care: "Spot clean with mild detergent",
    },
    isNew: true,
  },
]

const dummyCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: 1,
    name: "Casual Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    color: "Black",
    size: "M",
  },
  {
    id: "cart-2",
    productId: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=600&fit=crop",
    color: "Brown",
  },
  {
    id: "cart-3",
    productId: 102,
    name: "Slim Fit Chino Pants",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop",
    color: "Khaki",
    size: "32",
  },
]

// API functions with fallback to dummy data
export async function getProducts(): Promise<Product[]> {
  try {
    // Attempt to fetch from API with AbortController for safety
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch("/api/products", {
      next: { revalidate: 3600 }, // Revalidate every hour
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return await response.json()
  } catch (error) {
    console.log("Error fetching products, using dummy data", error)
    // Fall back to dummy data
    return dummyProducts
  }
}

// Update other fetch functions similarly to use safe signal handling
export async function getProductById(id: string | number): Promise<Product | undefined> {
  try {
    // Use a safer approach without AbortController if that's causing issues
    const response = await fetch(`/api/products/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`)
    }

    return await response.json()
  } catch (error) {
    console.log(`Error fetching product ${id}, using dummy data`, error)
    // Fall back to dummy data
    return dummyProducts.find((product) => product.id.toString() === id.toString())
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Attempt to fetch from API
    const response = await fetch("/api/products/featured", {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch featured products")
    }

    return await response.json()
  } catch (error) {
    console.log("Error fetching featured products, using dummy data", error)
    // Fall back to dummy data
    return dummyProducts.filter((product) => product.isFeatured)
  }
}

export async function getNewArrivals(): Promise<Product[]> {
  try {
    // Attempt to fetch from API
    const response = await fetch("/api/products/new-arrivals", {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch new arrivals")
    }

    return await response.json()
  } catch (error) {
    console.log("Error fetching new arrivals, using dummy data", error)
    // Fall back to dummy data
    return dummyProducts.filter((product) => product.isNew)
  }
}

export async function searchProducts(query: string, category?: string): Promise<Product[]> {
  try {
    // Attempt to fetch from API
    const url = new URL("/api/products/search", window.location.origin)
    url.searchParams.append("q", query)
    if (category && category !== "all") {
      url.searchParams.append("category", category)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error("Failed to search products")
    }

    return await response.json()
  } catch (error) {
    console.log("Error searching products, using dummy data", error)
    // Fall back to dummy data
    let filtered = dummyProducts

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    return filtered
  }
}

// Cart functions
export async function getCartItems(): Promise<CartItem[]> {
  try {
    // Attempt to fetch from API
    const response = await fetch("/api/cart", {
      next: { revalidate: 0 }, // Always fetch new data
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cart")
    }

    return await response.json()
  } catch (error) {
    console.log("Error fetching cart, using dummy data", error)
    // Fall back to dummy data
    return dummyCartItems
  }
}

export async function addToCart(
  productId: number | string,
  quantity: number,
  color?: string,
  size?: string,
): Promise<CartItem[]> {
  try {
    // Attempt to add to cart via API
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity, color, size }),
    })

    if (!response.ok) {
      throw new Error("Failed to add item to cart")
    }

    return await response.json()
  } catch (error) {
    console.log("Error adding to cart, using dummy data", error)
    // Fall back to dummy data - simulate adding to cart
    const product = dummyProducts.find((p) => p.id === productId)
    if (!product) throw new Error("Product not found")

    const existingItem = dummyCartItems.find(
      (item) => item.productId === productId && item.color === color && item.size === size,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      dummyCartItems.push({
        id: `cart-${Date.now()}`,
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0].src,
        color,
        size,
        discount: product.discount,
      })
    }

    return [...dummyCartItems]
  }
}

export async function updateCartItem(itemId: string, quantity: number): Promise<CartItem[]> {
  try {
    // Attempt to update cart via API
    const response = await fetch(`/api/cart/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) {
      throw new Error("Failed to update cart item")
    }

    return await response.json()
  } catch (error) {
    console.log("Error updating cart item, using dummy data", error)
    // Fall back to dummy data - simulate updating cart
    const itemIndex = dummyCartItems.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) throw new Error("Item not found in cart")

    if (quantity > 0) {
      dummyCartItems[itemIndex].quantity = quantity
    } else {
      dummyCartItems.splice(itemIndex, 1)
    }

    return [...dummyCartItems]
  }
}

export async function removeCartItem(itemId: string): Promise<CartItem[]> {
  try {
    // Attempt to remove from cart via API
    const response = await fetch(`/api/cart/${itemId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to remove cart item")
    }

    return await response.json()
  } catch (error) {
    console.log("Error removing cart item, using dummy data", error)
    // Fall back to dummy data - simulate removing from cart
    const itemIndex = dummyCartItems.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) throw new Error("Item not found in cart")

    dummyCartItems.splice(itemIndex, 1)

    return [...dummyCartItems]
  }
}


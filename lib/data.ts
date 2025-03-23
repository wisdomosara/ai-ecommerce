import type { Product, Category, Collection } from "./types";

// Mock Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    description: "Latest gadgets and electronic devices",
    productCount: 42,
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    description: "Fashion and apparel for all seasons",
    productCount: 56,
  },
  {
    id: "3",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=2070&auto=format&fit=crop",
    description: "Everything for your home",
    productCount: 38,
  },
  {
    id: "4",
    name: "Beauty",
    slug: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070&auto=format&fit=crop",
    description: "Skincare, makeup, and beauty products",
    productCount: 29,
  },
  {
    id: "5",
    name: "Sports",
    slug: "sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    description: "Sports equipment and activewear",
    productCount: 31,
  },
  {
    id: "6",
    name: "Books",
    slug: "books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop",
    description: "Books across all genres",
    productCount: 45,
  },
];

// Mock Collections
export const collections: Collection[] = [
  {
    id: "1",
    name: "Summer Essentials",
    slug: "summer-essentials",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop",
    description: "Everything you need for the summer season",
    productCount: 24,
  },
  {
    id: "2",
    name: "Work From Home",
    slug: "work-from-home",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
    description: "Boost your productivity with these essentials",
    productCount: 18,
  },
  {
    id: "3",
    name: "Fitness Collection",
    slug: "fitness-collection",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    description: "Stay fit and healthy with our fitness collection",
    productCount: 15,
  },
  {
    id: "4",
    name: "Winter Wear",
    slug: "winter-wear",
    image:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop",
    description: "Stay warm and stylish this winter",
    productCount: 22,
  },
  {
    id: "5",
    name: "Smart Home",
    slug: "smart-home",
    image:
      "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?q=80&w=2070&auto=format&fit=crop",
    description: "Transform your home with smart technology",
    productCount: 19,
  },
  {
    id: "6",
    name: "Outdoor Adventure",
    slug: "outdoor-adventure",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    description: "Gear up for your next outdoor adventure",
    productCount: 27,
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality sound with noise cancellation technology. Perfect for music lovers and professionals alike. Enjoy up to 20 hours of battery life and crystal clear audio quality.",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    collection: "Summer Essentials",
    collectionSlug: "summer-essentials",
    isNew: true,
    isFeatured: true,
    rating: 4.5,
    stock: 45,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Track your fitness goals and monitor your health with this advanced smartwatch. Features include heart rate monitoring, sleep tracking, and workout analysis.",
    price: 89.99,
    originalPrice: 99.99,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2027&auto=format&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    collection: "Fitness Collection",
    collectionSlug: "fitness-collection",
    isNew: true,
    isFeatured: false,
    rating: 4.2,
    stock: 32,
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description:
      "Comfortable chair for long working hours. Designed with ergonomic principles to support your back and promote good posture during extended periods of sitting.",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589364222378-4dc6c2c6dcc7?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "Home & Kitchen",
    categorySlug: "home-kitchen",
    collection: "Work From Home",
    collectionSlug: "work-from-home",
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    stock: 15,
  },
  {
    id: "4",
    name: "Premium Cotton T-Shirt",
    description:
      "Comfortable and breathable cotton t-shirt for everyday wear. Made from 100% organic cotton that feels soft against your skin and maintains its shape after washing.",
    price: 24.99,
    originalPrice: undefined,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Clothing",
    categorySlug: "clothing",
    collection: "Summer Essentials",
    collectionSlug: "summer-essentials",
    isNew: false,
    isFeatured: false,
    rating: 4.0,
    stock: 100,
  },
  {
    id: "5",
    name: "Professional Yoga Mat",
    description:
      "Non-slip yoga mat for all types of yoga. This premium mat provides excellent grip and cushioning for your practice, whether you're a beginner or advanced yogi.",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Sports",
    categorySlug: "sports",
    collection: "Fitness Collection",
    collectionSlug: "fitness-collection",
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    stock: 28,
  },
  {
    id: "6",
    name: "Bestselling Novel: The Silent Echo",
    description:
      "The latest bestselling fiction novel that has captivated readers worldwide. A thrilling story of mystery and adventure that will keep you turning pages late into the night.",
    price: 14.99,
    originalPrice: undefined,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "Books",
    categorySlug: "books",
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    stock: 50,
  },
  {
    id: "7",
    name: "Complete Skincare Set",
    description:
      "Complete skincare routine in one set. This comprehensive collection includes cleanser, toner, serum, moisturizer, and SPF to keep your skin healthy and glowing.",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Beauty",
    categorySlug: "beauty",
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    stock: 22,
  },
  {
    id: "8",
    name: "Fast Wireless Charger",
    description:
      "Fast wireless charging for compatible devices. This sleek charger delivers up to 15W of power and works with all Qi-enabled smartphones and accessories.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618478594486-c65b899c4936?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    collection: "Work From Home",
    collectionSlug: "work-from-home",
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    stock: 40,
  },
  {
    id: "9",
    name: "Mechanical Keyboard",
    description:
      "Premium mechanical keyboard with RGB lighting and customizable keys. Enjoy tactile feedback and faster typing with this durable and responsive keyboard.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    collection: "Work From Home",
    collectionSlug: "work-from-home",
    isNew: true,
    isFeatured: true,
    rating: 4.7,
    stock: 25,
  },
  {
    id: "10",
    name: "Insulated Water Bottle",
    description:
      "Keep your drinks hot or cold for hours with this premium insulated water bottle. Perfect for hiking, gym, or everyday use.",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1936&auto=format&fit=crop",
    ],
    category: "Sports",
    categorySlug: "sports",
    collection: "Outdoor Adventure",
    collectionSlug: "outdoor-adventure",
    isNew: false,
    isFeatured: true,
    rating: 4.5,
    stock: 60,
  },
  {
    id: "11",
    name: "Smart Home Speaker",
    description:
      "Voice-controlled smart speaker with premium sound quality. Control your smart home devices, play music, and get information with simple voice commands.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    collection: "Smart Home",
    collectionSlug: "smart-home",
    isNew: true,
    isFeatured: true,
    rating: 4.6,
    stock: 35,
  },
  {
    id: "12",
    name: "Winter Parka Jacket",
    description:
      "Stay warm in extreme cold with this insulated winter parka. Featuring a waterproof exterior and premium down filling to keep you comfortable in any weather.",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516914589923-f105f1535f88?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "Clothing",
    categorySlug: "clothing",
    collection: "Winter Wear",
    collectionSlug: "winter-wear",
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    stock: 20,
  },
];

// Helper functions to get data
export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew).slice(0, 4);
}

export function getDeals(): Product[] {
  return products
    .filter((product) => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);
}

export function getTrendingProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter(
    (product) => product.collectionSlug === collectionSlug
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}

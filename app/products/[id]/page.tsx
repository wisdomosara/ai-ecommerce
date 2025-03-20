import ProductDetails from "@/components/product-details";
import { Metadata } from "next";

// This would come from your database in a real app
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Casual Cotton T-Shirt",
      description:
        "A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear, this t-shirt features a classic fit and is available in multiple colors.",
      price: 29.99,
      category: "Men's Fashion",
      subcategory: "T-shirts",
      brand: "StyleBasics",
      images: [
        {
          src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Front",
          alt: "Casual Cotton T-Shirt - Front",
        },
        {
          src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Back",
          alt: "Casual Cotton T-Shirt - Back",
        },
        {
          src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Detail",
          alt: "Casual Cotton T-Shirt - Detail",
        },
        {
          src: "/placeholder.svg?height=600&width=600&text=T-Shirt+Fabric",
          alt: "Casual Cotton T-Shirt - Fabric",
        },
      ],
      colors: ["Black", "White", "Navy", "Gray", "Red"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      rating: 4.5,
      reviewCount: 128,
      stock: 50,
      sku: "TS-001-BLK",
      features: [
        "100% organic cotton",
        "Classic fit",
        "Crew neck",
        "Short sleeves",
        "Machine washable",
      ],
      specifications: {
        Material: "100% Organic Cotton",
        Fit: "Classic",
        Neck: "Crew",
        Sleeve: "Short",
        Care: "Machine wash cold, tumble dry low",
      },
    },
    // More products would be here
  ];

  return products.find((product) => product.id === id);
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0].src,
          width: 600,
          height: 600,
          alt: product.images[0].alt,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}

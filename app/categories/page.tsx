import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      name: "Women's Fashion",
      slug: "womens-fashion",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Activewear"],
    },
    {
      name: "Men's Fashion",
      slug: "mens-fashion",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: ["Shirts", "Pants", "Suits", "T-shirts", "Jackets"],
    },
    {
      name: "Accessories",
      slug: "accessories",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: ["Bags", "Jewelry", "Watches", "Hats", "Belts"],
    },
    {
      name: "Footwear",
      slug: "footwear",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: ["Sneakers", "Boots", "Sandals", "Heels", "Loafers"],
    },
    {
      name: "Beauty",
      slug: "beauty",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Fragrance",
        "Bath & Body",
      ],
    },
    {
      name: "Home & Living",
      slug: "home-living",
      image: "/placeholder.svg?height=400&width=600",
      subcategories: ["Decor", "Bedding", "Kitchen", "Bath", "Furniture"],
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Categories</h1>
        <p className="text-muted-foreground">
          Browse all product categories and find what you're looking for.
        </p>
      </div>

      <div className="grid gap-8">
        {categories?.map((category) => (
          <div
            key={category.slug}
            className="grid md:grid-cols-2 gap-6 items-center border rounded-xl p-6 hover:border-primary transition-colors"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/categories/${category.slug}/${subcategory
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-primary flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-1" />
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View All {category.name}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

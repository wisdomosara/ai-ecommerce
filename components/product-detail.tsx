"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="container py-10 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4 overflow-hidden">
          <div className="relative overflow-hidden rounded-xl max-h-[500px] md:max-h-none">
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerGroup={1}
              thumbs={{ swiper: thumbsSwiper }}
              className="product-detail-swiper rounded-xl"
            >
              {product.images.map((image, index) => (
                <SwiperSlide className="w-full" key={index}>
                  <div className="aspect-square w-full">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - image ${index + 1}`}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}

              {product.isNew && (
                <Badge className="absolute left-4 top-4 z-10">New</Badge>
              )}

              {product.discount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute right-4 top-4 z-10"
                >
                  {product.discount}% OFF
                </Badge>
              )}
            </Swiper>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80"
              ref={prevRef}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80"
              ref={nextRef}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Navigation, Thumbs]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbs-swiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index} className="!w-16 !h-16">
                  <div className="h-full w-full overflow-hidden rounded-md border cursor-pointer">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} rating
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl md:text-3xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
            {product.discount > 0 && (
              <Badge variant="destructive">{product.discount}% OFF</Badge>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div>
            <p className="mb-2 font-medium">Category:</p>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="inline-block rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
            >
              {product.category}
            </Link>

            {product.collection && (
              <div className="mt-4">
                <p className="mb-2 font-medium">Collection:</p>
                <Link
                  href={`/collections/${product.collectionSlug}`}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {product.collection}
                </Link>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 font-medium">Quantity:</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
              >
                +
              </Button>
              <span className="ml-4 text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 min-h-[44px]"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

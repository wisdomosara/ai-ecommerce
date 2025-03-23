"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import type { Product } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isAuthenticated, user, toggleSavedItem } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Check if product is saved
  useEffect(() => {
    if (isAuthenticated && user?.savedItems) {
      setIsSaved(user.savedItems.includes(product.id));
    }
  }, [isAuthenticated, user, product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      toggleSavedItem(product.id);
      setIsSaved(!isSaved);
    } else {
      // Redirect to login
      window.location.href = `/login?redirectTo=${encodeURIComponent(
        `/products/${product.id}`
      )}`;
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border transition-all duration-300 hover:shadow-md">
        <div className="aspect-square w-full overflow-hidden rounded-lg max-h-[300px] md:max-h-none">
          {product.images.length > 1 ? (
            <div className="relative h-full w-full">
              <Swiper
                modules={[Navigation, Pagination]}
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
                className="h-full product-swiper"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - image ${index + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Button
                variant="ghost"
                size="icon"
                className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 h-7 w-7 rounded-full bg-background/80 opacity-0 transition-opacity ${
                  isHovered ? "opacity-100" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                ref={prevRef}
              >
                <ChevronLeft className="h-3 w-3" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 h-7 w-7 rounded-full bg-background/80 opacity-0 transition-opacity ${
                  isHovered ? "opacity-100" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                ref={nextRef}
              >
                <ChevronRight className="h-3 w-3" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          ) : (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>

        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}

          {product.discount > 0 && (
            <Badge variant="destructive">{product.discount}% OFF</Badge>
          )}
        </div>

        <div className="p-3 space-y-1">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <p className="font-semibold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.category}
          </p>

          <div className="pt-2 flex justify-between items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              variant={isSaved ? "default" : "outline"}
              size="icon"
              className={`h-9 w-9 ${
                isSaved ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
              }`}
              onClick={handleToggleSave}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-primary" : ""}`} />
              <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void;
  initialFilters?: any;
  onVisibilityChange?: (visible: boolean) => void;
  maxPriceInSearch?: number;
}

export default function ProductFilters({
  onFilterChange,
  initialFilters,
  onVisibilityChange,
  maxPriceInSearch = 1000,
}: ProductFiltersProps) {
  // Calculate a reasonable default maximum and slider max
  const actualMaxPrice = maxPriceInSearch || 1000;
  const sliderMaxPrice = Math.min(actualMaxPrice, 10000); // Limit slider to a reasonable max even if items are very expensive
  const roundedSliderMax = Math.ceil(sliderMaxPrice / 100) * 100; // Round up to nearest hundred for cleaner UI

  // Basic state
  const [minPrice, setMinPrice] = useState(
    initialFilters?.priceRange?.[0] || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    initialFilters?.priceRange?.[1] || actualMaxPrice
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters?.categories || []
  );
  const [selectedRatings, setSelectedRatings] = useState(
    initialFilters?.ratings || []
  );
  const [sortOption, setSortOption] = useState(
    initialFilters?.sort || "relevance"
  );
  const [showFilters, setShowFilters] = useState(true);

  // Track section visibility
  const [showCategories, setShowCategories] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showSorting, setShowSorting] = useState(true);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(showFilters);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile using effect to avoid SSR issues
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Set up listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update max price when maxPriceInSearch changes
  useEffect(() => {
    if (maxPriceInSearch) {
      // If we already have a user-selected max price, only update if needed
      if (maxPrice > maxPriceInSearch || !initialFilters?.priceRange) {
        setMaxPrice(Math.min(maxPrice, maxPriceInSearch));
      }
    }
  }, [maxPriceInSearch, maxPrice, initialFilters]);

  // Update filters when they change
  useEffect(() => {
    const delay = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          priceRange: [minPrice, maxPrice],
          categories: selectedCategories,
          ratings: selectedRatings,
          sort: sortOption,
        });
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [
    minPrice,
    maxPrice,
    selectedCategories,
    selectedRatings,
    sortOption,
    onFilterChange,
  ]);

  // Update visibility effect
  useEffect(() => {
    if (showFilters) {
      setIsVisible(true);
    }
  }, [showFilters]);

  // Handle category selection
  const toggleCategory = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      setSelectedCategories(
        selectedCategories.filter((c: string) => c !== categorySlug)
      );
    } else {
      setSelectedCategories([...selectedCategories, categorySlug]);
    }
  };

  // Handle rating selection
  const toggleRating = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r: number) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(actualMaxPrice);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSortOption("relevance");
  };

  // Toggle visibility with animation (mobile only)
  const toggleShowFilters = (visible: boolean) => {
    if (visible !== showFilters) {
      // Only animate on mobile
      if (isMobile) {
        setIsAnimating(true);
        if (visible) {
          // Opening
          setIsVisible(true);
          // Wait a tiny bit for the isVisible class to apply, then show
          setTimeout(() => {
            setShowFilters(true);
            if (onVisibilityChange) {
              onVisibilityChange(true);
            }
          }, 10);

          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        } else {
          // Closing
          setIsAnimating(true);
          setShowFilters(false);
          if (onVisibilityChange) {
            onVisibilityChange(false);
          }

          // Keep the element in the DOM during animation
          setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
          }, 300);
        }
      } else {
        // Immediate change on desktop
        setShowFilters(visible);
        setIsVisible(visible);
        if (onVisibilityChange) {
          onVisibilityChange(visible);
        }
      }
    }
  };

  if (!showFilters && !isAnimating) {
    return (
      <>
        {/* Desktop button */}
        <Button
          variant="outline"
          onClick={() => toggleShowFilters(true)}
          className="hidden md:flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Show Filters</span>
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* Mobile floating button */}
        <Button
          variant="default"
          onClick={() => toggleShowFilters(true)}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg rounded-full px-8 py-6 flex items-center gap-2 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </Button>
      </>
    );
  }

  return (
    <div
      className={cn(
        "border rounded-lg p-4 space-y-6",
        // Different styles for mobile and desktop
        "md:w-64 md:static md:border md:rounded-lg",
        // Mobile styles with animations
        "md:bg-background md:overflow-visible",
        "md:top-auto md:translate-y-0 md:opacity-100",
        !showFilters && !isVisible ? "hidden md:block" : "",

        // Mobile only: animations and full-screen
        "md:relative fixed w-full z-50 bg-background overflow-y-auto",
        "inset-x-0 bottom-0",
        // Control height based on visibility (mobile only)
        isVisible ? "top-0" : "top-full",
        // Animation on mobile only
        !isAnimating ? "" : "transition-all duration-300 ease-in-out",
        showFilters ? "translate-y-0 opacity-100" : "translate-y-1/4 opacity-0"
      )}
      style={{
        // Add inline transition style only for mobile
        transition: isMobile ? "all 300ms ease-in-out" : "none",
      }}
    >
      <div className="flex items-center justify-between sticky top-0 pt-2 pb-2 bg-background">
        <h3 className="font-medium">Filters</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleShowFilters(false)}
            className="h-8 w-8 p-0 flex items-center justify-center transition duration-300 hover:bg-secondary"
          >
            <ChevronUp className="hidden md:block h-4 w-4" />
            <X className="md:hidden h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4">
        <h4 className="text-sm font-medium mb-4">Price Range</h4>

        {/* Input Fields */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div>
            <Label htmlFor="min-price" className="text-xs mb-1 block">
              Min
            </Label>
            <Input
              id="min-price"
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                if (value < maxPrice) {
                  setMinPrice(value);
                }
              }}
              className="h-8 w-[80px]"
            />
          </div>
          <div className="pt-5">-</div>
          <div>
            <Label htmlFor="max-price" className="text-xs mb-1 block">
              Max
            </Label>
            <Input
              id="max-price"
              type="number"
              min={minPrice}
              max={actualMaxPrice * 2}
              value={maxPrice}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                if (value > minPrice) {
                  setMaxPrice(value);
                }
              }}
              className="h-8 w-[80px]"
            />
          </div>
        </div>

        {/* Combined Range Slider */}
        <div className="my-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>$0</span>
            <span>${actualMaxPrice}</span>
          </div>

          <div className="relative h-10 mt-4 mb-2">
            {/* Track background */}
            <div className="absolute top-4 left-0 right-0 h-2 bg-secondary rounded-full"></div>

            {/* Active track between handles */}
            <div
              className="absolute top-4 h-2 bg-primary rounded-full"
              style={{
                left: `${(minPrice / actualMaxPrice) * 100}%`,
                right: `${
                  100 -
                  (Math.min(maxPrice, actualMaxPrice) / actualMaxPrice) * 100
                }%`,
              }}
            ></div>

            {/* Min Slider (positioned underneath but with higher z-index for the thumb) */}
            <div className="absolute inset-0">
              <input
                type="range"
                min={0}
                max={actualMaxPrice}
                step={Math.max(1, Math.floor(actualMaxPrice / 100))}
                value={minPrice}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value);
                  if (newMin <= maxPrice - 10) {
                    setMinPrice(newMin);
                  }
                }}
                className="absolute inset-0 w-full h-10 opacity-0 z-30 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:z-40 [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:h-9 [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:z-40 [&::-moz-range-thumb]:cursor-grab [&:active::-webkit-slider-thumb]:cursor-grabbing [&:active::-moz-range-thumb]:cursor-grabbing"
              />
              <span
                className="absolute top-4 -mt-2 w-5 h-5 bg-white border-2 border-primary rounded-full -ml-2.5 pointer-events-none z-20"
                style={{ left: `${(minPrice / actualMaxPrice) * 100}%` }}
              ></span>
            </div>

            {/* Max Slider (positioned on top but with lower z-index for the thumb) */}
            <div className="absolute inset-0">
              <input
                type="range"
                min={0}
                max={actualMaxPrice}
                step={Math.max(1, Math.floor(actualMaxPrice / 100))}
                value={Math.min(maxPrice, actualMaxPrice)}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value);
                  if (newMax >= minPrice + 10) {
                    setMaxPrice(newMax);
                  }
                }}
                className="absolute inset-0 w-full h-10 opacity-0 z-20 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-9 [&::-moz-range-thumb]:h-9 [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:z-10 [&::-moz-range-thumb]:cursor-grab [&:active::-webkit-slider-thumb]:cursor-grabbing [&:active::-moz-range-thumb]:cursor-grabbing"
              />
              <span
                className="absolute top-4 -mt-2 w-5 h-5 bg-white border-2 border-primary rounded-full -ml-2.5 pointer-events-none z-10"
                style={{
                  left: `${
                    maxPrice >= actualMaxPrice
                      ? 100
                      : (Math.min(maxPrice, actualMaxPrice) / actualMaxPrice) *
                        100
                  }%`,
                }}
              ></span>
            </div>
          </div>

          {/* Price display */}
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Min: ${minPrice}</span>
            <span>Max: ${maxPrice}</span>
          </div>
        </div>

        {/* Preset buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {actualMaxPrice > 20 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(20);
              }}
            >
              Under $20
            </Button>
          )}
          {actualMaxPrice > 40 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMinPrice(20);
                setMaxPrice(40);
              }}
            >
              $20 - $40
            </Button>
          )}
          {actualMaxPrice > 40 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMinPrice(40);
                setMaxPrice(actualMaxPrice);
              }}
            >
              $40+
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(actualMaxPrice);
            }}
          >
            Full Range
          </Button>
        </div>
      </div>

      {/* Sort By */}
      <div className="border-b pb-4">
        <button
          className="flex items-center justify-between w-full text-sm font-medium mb-3"
          onClick={() => setShowSorting(!showSorting)}
        >
          <span>Sort By</span>
          {showSorting ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showSorting && (
          <RadioGroup
            value={sortOption}
            onValueChange={setSortOption}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="relevance" id="sort-relevance" />
              <Label htmlFor="sort-relevance">Relevance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-low" id="sort-price-low" />
              <Label htmlFor="sort-price-low">Price: Low to High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-high" id="sort-price-high" />
              <Label htmlFor="sort-price-high">Price: High to Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="sort-rating" />
              <Label htmlFor="sort-rating">Highest Rated</Label>
            </div>
          </RadioGroup>
        )}
      </div>

      {/* Categories */}
      <div className="border-b pb-4">
        <button
          className="flex items-center justify-between w-full text-sm font-medium mb-3"
          onClick={() => setShowCategories(!showCategories)}
        >
          <span>Categories</span>
          {showCategories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showCategories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={() => toggleCategory(category.slug)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div>
        <button
          className="flex items-center justify-between w-full text-sm font-medium mb-3"
          onClick={() => setShowRatings(!showRatings)}
        >
          <span>Rating</span>
          {showRatings ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showRatings && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => toggleRating(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  <span className="ml-1">{rating}+ Stars</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

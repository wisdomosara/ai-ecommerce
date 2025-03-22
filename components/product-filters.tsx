"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories } from "@/lib/data"
import { useMobile } from "@/hooks/use-mobile"

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const isMobile = useMobile()
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(!isMobile)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200)

  // Update price range when min/max inputs change
  useEffect(() => {
    if (minPrice <= maxPrice) {
      setPriceRange([minPrice, maxPrice])
      if (onFilterChange) {
        onFilterChange({ priceRange: [minPrice, maxPrice], categories: selectedCategories })
      }
    }
  }, [minPrice, maxPrice, selectedCategories])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    setMinPrice(value[0])
    setMaxPrice(value[1])
    if (onFilterChange) {
      onFilterChange({ priceRange: value, categories: selectedCategories })
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)

    setSelectedCategories(newCategories)

    if (onFilterChange) {
      onFilterChange({ priceRange, categories: newCategories })
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 200])
    setMinPrice(0)
    setMaxPrice(200)
    setSelectedCategories([])

    if (onFilterChange) {
      onFilterChange({ priceRange: [0, 200], categories: [] })
    }
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Price Range</h4>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={200}
          step={5}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="py-4"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">$</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              min={0}
              max={maxPrice}
            />
          </div>
          <span className="text-sm">-</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">$</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              min={minPrice}
              max={200}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
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
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {rating} Stars & Above
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 rounded-full shadow-lg"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] mobile-filter">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="w-full md:w-64 shrink-0">
      {showFilters ? (
        <div className="sticky top-20 space-y-6 rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="h-8 w-8 p-0">
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          <FiltersContent />
        </div>
      ) : (
        <Button variant="outline" onClick={() => setShowFilters(true)} className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Show Filters</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}


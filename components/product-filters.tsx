"use client"

import { useState, useEffect, useRef } from "react"
import { SlidersHorizontal, ChevronUp, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { categories } from "@/lib/data"
import { useMobile } from "@/hooks/use-mobile"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
  initialFilters?: any
  onVisibilityChange?: (visible: boolean) => void
}

export default function ProductFilters({ onFilterChange, initialFilters, onVisibilityChange }: ProductFiltersProps) {
  const isMobile = useMobile()
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters?.priceRange?.[0] || 0,
    initialFilters?.priceRange?.[1] || 200,
  ])
  const [minPrice, setMinPrice] = useState(initialFilters?.priceRange?.[0]?.toString() || "0")
  const [maxPrice, setMaxPrice] = useState(initialFilters?.priceRange?.[1]?.toString() || "200")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || [])
  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialFilters?.ratings || [])
  const [sortOption, setSortOption] = useState(initialFilters?.sort || "relevance")
  const [showFilters, setShowFilters] = useState(!isMobile)
  const [expandedItems, setExpandedItems] = useState<string[]>(["sort"])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isInitialMount = useRef(true)
  const debouncedUpdate = useRef<NodeJS.Timeout | null>(null)

  // Update filters when props change
  useEffect(() => {
    if (initialFilters && !isInitialMount.current) {
      setPriceRange([initialFilters.priceRange?.[0] || 0, initialFilters.priceRange?.[1] || 200])
      setMinPrice(initialFilters.priceRange?.[0]?.toString() || "0")
      setMaxPrice(initialFilters.priceRange?.[1]?.toString() || "200")
      setSelectedCategories(initialFilters.categories || [])
      setSelectedRatings(initialFilters.ratings || [])
      setSortOption(initialFilters.sort || "relevance")
    }
    isInitialMount.current = false
  }, [initialFilters])

  // Debounced filter update function
  const updateFilters = () => {
    if (debouncedUpdate.current) {
      clearTimeout(debouncedUpdate.current)
    }

    debouncedUpdate.current = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          priceRange: priceRange,
          categories: selectedCategories,
          ratings: selectedRatings,
          sort: sortOption,
        })
      }
    }, 300) // 300ms debounce
  }

  // Call updateFilters when any filter changes
  useEffect(() => {
    if (!isInitialMount.current) {
      updateFilters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, selectedCategories, selectedRatings, sortOption])

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (debouncedUpdate.current) {
        clearTimeout(debouncedUpdate.current)
      }
    }
  }, [])

  const handleAccordionChange = (value: string) => {
    if (expandedItems.includes(value)) {
      setExpandedItems(expandedItems.filter((item) => item !== value))
    } else {
      setExpandedItems([...expandedItems, value])
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)
    setSelectedCategories(newCategories)
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked ? [...selectedRatings, rating] : selectedRatings.filter((r) => r !== rating)
    setSelectedRatings(newRatings)
  }

  const handlePriceInputChange = (min: string, max: string) => {
    const minVal = Number.parseInt(min) || 0
    const maxVal = Number.parseInt(max) || 200

    if (minVal <= maxVal) {
      setPriceRange([minVal, maxVal])
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 200])
    setMinPrice("0")
    setMaxPrice("200")
    setSelectedCategories([])
    setSelectedRatings([])
    setSortOption("relevance")
  }

  const toggleShowFilters = (visible: boolean) => {
    setShowFilters(visible)
    if (onVisibilityChange) {
      onVisibilityChange(visible)
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

      <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="w-full">
        <AccordionItem value="sort">
          <AccordionTrigger className="text-sm font-medium">Sort By</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={sortOption} onValueChange={setSortOption} className="space-y-2">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 px-1 py-2">
              {/* Manual price input */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-full">
                  <Label htmlFor="min-price" className="text-xs mb-1 block">
                    Min
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value)
                      handlePriceInputChange(e.target.value, maxPrice)
                    }}
                    className="h-8"
                  />
                </div>
                <div className="pt-5">-</div>
                <div className="w-full">
                  <Label htmlFor="max-price" className="text-xs mb-1 block">
                    Max
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    min={minPrice}
                    max="500"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value)
                      handlePriceInputChange(minPrice, e.target.value)
                    }}
                    className="h-8"
                  />
                </div>
              </div>

              {/* Slider */}
              <Slider
                value={priceRange}
                min={0}
                max={500}
                step={5}
                onValueChange={(value) => {
                  setPriceRange(value as [number, number])
                  setMinPrice(value[0].toString())
                  setMaxPrice(value[1].toString())
                }}
                className="mt-6"
              />

              <div className="flex items-center justify-between text-sm">
                <div className="rounded-md border px-2 py-1">${priceRange[0]}</div>
                <div className="rounded-md border px-2 py-1">${priceRange[1]}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCategoryChange(category.slug, !selectedCategories.includes(category.slug))
                    }}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRatingChange(rating, !selectedRatings.includes(rating))
                    }}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 rounded-full shadow-lg"
              onClick={() => setIsSheetOpen(true)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] w-full p-0 mobile-filter">
            <SheetHeader className="sticky top-0 z-10 bg-background px-4 pt-4 pb-2 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
            <div className="overflow-y-auto h-full px-4 pb-20 pt-2">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className={`transition-all duration-300 ${showFilters ? "w-full md:w-64 shrink-0" : "w-auto"}`}>
      {showFilters ? (
        <div className="sticky top-20 space-y-6 rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={() => toggleShowFilters(false)} className="h-8 w-8 p-0">
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          <FiltersContent />
        </div>
      ) : (
        <Button variant="outline" onClick={() => toggleShowFilters(true)} className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Show Filters</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}


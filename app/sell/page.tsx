import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Become a Seller | StyleStore",
  description: "Register as a seller on StyleStore and start selling your products",
}

export default function SellerRegistrationPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Become a Seller on StyleStore</h1>
        <p className="text-muted-foreground max-w-2xl">
          Join our marketplace and reach millions of customers. Start selling your products today and grow your business
          with StyleStore.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              Global Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access millions of customers worldwide and expand your business beyond geographical boundaries.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              Easy Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get started quickly with our intuitive seller dashboard and product management tools.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              Secure Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Receive payments securely and on time with our trusted payment processing system.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registration Form */}
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">Seller Registration</h2>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" type="text" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" type="text" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Information</h3>
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-type">Business Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax-id">Tax ID / Business Registration Number</Label>
                <Input id="tax-id" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Input id="business-address" type="text" placeholder="Street Address" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="State/Province" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Postal Code" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      {/* More countries would be added here */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Store Information</h3>
              <div className="grid gap-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" type="text" />
                <p className="text-xs text-muted-foreground">This will be displayed to customers on the marketplace</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  rows={4}
                  placeholder="Tell customers about your store, products, and brand story"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-categories">Product Categories</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="womens-fashion">Women's Fashion</SelectItem>
                    <SelectItem value="mens-fashion">Men's Fashion</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="home-living">Home & Living</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/seller-terms" className="text-primary underline-offset-4 hover:underline">
                    seller terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button size="lg" className="w-full">
                Submit Application
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="sticky top-20">
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Sell+on+StyleStore"
                alt="Sell on StyleStore"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Seller Success Stories</CardTitle>
                <CardDescription>Join thousands of successful sellers on our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="italic text-muted-foreground">
                    "Since joining StyleStore as a seller, my business has grown by 300%. The platform's reach and tools
                    have been invaluable for my brand's success."
                  </p>
                  <p className="text-sm font-medium mt-2">— Sarah J., Fashion Designer</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="italic text-muted-foreground">
                    "The seller dashboard makes it so easy to manage inventory and track sales. I've been able to focus
                    more on creating products and less on administration."
                  </p>
                  <p className="text-sm font-medium mt-2">— Michael T., Accessories Brand</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Have questions? Contact our{" "}
                  <Link href="/seller-support" className="text-primary hover:underline">
                    Seller Support Team
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


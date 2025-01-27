import { useState } from "react"
import { ImageGallery } from "@/components/ImageGallery"
import { CurrencySelector, type CurrencyType } from "@/components/CurrencySelector"
import { ProductEditor } from "@/components/ProductEditor"
import { VariantManager } from "@/components/VariantManager"
import { ReviewStars } from "@/components/ReviewStars"
import { Header } from "@/components/Header"

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
]

const INITIAL_SIZES = [
  { id: "s", name: "S", inStock: true },
  { id: "m", name: "M", inStock: true },
  { id: "l", name: "L", inStock: false },
  { id: "xl", name: "XL", inStock: true },
]

const INITIAL_COLORS = [
  { id: "black", name: "Black", inStock: true },
  { id: "white", name: "White", inStock: true },
  { id: "gray", name: "Gray", inStock: true },
]

const Index = () => {
  const [selectedSize, setSelectedSize] = useState(INITIAL_SIZES[0].id)
  const [selectedColor, setSelectedColor] = useState(INITIAL_COLORS[0].id)
  const [productName, setProductName] = useState("Premium Product Name")
  const [productPrice, setProductPrice] = useState("299.99")
  const [productDescription, setProductDescription] = useState(
    "Experience unparalleled quality with our premium product. Crafted with attention to detail and designed for those who appreciate excellence."
  )
  const [sizes, setSizes] = useState(INITIAL_SIZES)
  const [colors, setColors] = useState(INITIAL_COLORS)
  const [currency, setCurrency] = useState<CurrencyType>("USD")

  const handleUpdateProduct = (name: string, price: string, description: string) => {
    setProductName(name)
    setProductPrice(price)
    setProductDescription(description)
  }

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price)
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    })
    return formatter.format(numPrice)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 mt-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            <ImageGallery images={DEFAULT_IMAGES} />
          </div>
          
          <div className="space-y-8 fade-in" style={{ animationDelay: "200ms" }}>
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              New Arrival
            </div>

            <div className="flex items-center justify-end">
              <CurrencySelector value={currency} onValueChange={setCurrency} />
            </div>

            <ProductEditor
              productName={productName}
              productPrice={formatPrice(productPrice)}
              productDescription={productDescription}
              onUpdateProduct={handleUpdateProduct}
            />

            <div className="flex items-center gap-4">
              <ReviewStars rating={4} />
              <span className="text-sm text-muted-foreground">(150 reviews)</span>
            </div>

            <div className="space-y-6">
              <VariantManager
                type="size"
                variants={sizes}
                selectedVariant={selectedSize}
                onVariantChange={setSelectedSize}
                onVariantsUpdate={setSizes}
              />

              <VariantManager
                type="color"
                variants={colors}
                selectedVariant={selectedColor}
                onVariantChange={setSelectedColor}
                onVariantsUpdate={setColors}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index
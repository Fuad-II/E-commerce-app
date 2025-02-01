import { useState } from "react"
import { ImageGallery } from "@/components/ImageGallery"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CurrencySelector, type CurrencyType } from "@/components/CurrencySelector"
import { ProductEditor } from "@/components/ProductEditor"
import { VariantManager } from "@/components/VariantManager"
import { ReviewStars } from "@/components/ReviewStars"
import { Header } from "@/components/Header"
import { useToast } from "@/hooks/use-toast"

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

const ProductShowcase = () => {
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
  const navigate = useNavigate()
  const { toast } = useToast()
  const [estimatedDelivery] = useState("3-5 business days")

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: "Your item has been added to the cart successfully!",
      duration: 3000,
    })
    navigate("/checkout")
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container py-12 mt-16">
        <div className="glass-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="fade-in">
              <ImageGallery images={DEFAULT_IMAGES} />
            </div>
            
            <div className="space-y-8 fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex justify-between items-center">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  New Arrival
                </div>
                <CurrencySelector value={currency} onValueChange={setCurrency} />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{productName}</h1>
                <div className="text-3xl font-bold text-primary">{formatPrice(productPrice)}</div>
                <p className="text-lg text-gray-600">{productDescription}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <ReviewStars rating={4} />
                  <span className="text-sm text-muted-foreground">(150 reviews)</span>
                </div>
                
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Estimated Delivery: {estimatedDelivery}
                </div>
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

                <Button 
                  size="lg" 
                  className="w-full animate-fade-in hover:scale-105 transition-transform bg-primary hover:bg-primary/90" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4 text-lg">Product Features:</h3>
                <ul className="grid gap-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Handcrafted with care
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Lifetime warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Free returns within 30 days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductShowcase
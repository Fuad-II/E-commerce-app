import { useState } from "react"
import { ImageGallery } from "@/components/ImageGallery"
import { VariantSelector } from "@/components/VariantSelector"
import { ReviewStars } from "@/components/ReviewStars"
import { RelatedProducts } from "@/components/RelatedProducts"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Edit2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CurrencySelector, type CurrencyType } from "@/components/CurrencySelector"
import { ProductManager } from "@/components/ProductManager"

const MOCK_SIZES = [
  { id: "s", name: "S", inStock: true },
  { id: "m", name: "M", inStock: true },
  { id: "l", name: "L", inStock: false },
  { id: "xl", name: "XL", inStock: true },
];

const MOCK_COLORS = [
  { id: "black", name: "Black", inStock: true },
  { id: "white", name: "White", inStock: true },
  { id: "gray", name: "Gray", inStock: true },
];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
];

const MOCK_RELATED = [
  { id: "1", name: "Related Product 1", price: 99.99, image: DEFAULT_IMAGES[0] },
  { id: "2", name: "Related Product 2", price: 149.99, image: DEFAULT_IMAGES[1] },
  { id: "3", name: "Related Product 3", price: 199.99, image: DEFAULT_IMAGES[2] },
  { id: "4", name: "Related Product 4", price: 299.99, image: DEFAULT_IMAGES[3] },
];

const Index = () => {
  const [selectedSize, setSelectedSize] = useState(MOCK_SIZES[0].id)
  const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].id)
  const [isEditing, setIsEditing] = useState(false)
  const [productName, setProductName] = useState("Premium Product Name")
  const [productPrice, setProductPrice] = useState("299.99")
  const [productDescription, setProductDescription] = useState(
    "Experience unparalleled quality with our premium product. Crafted with attention to detail and designed for those who appreciate excellence."
  )
  const [sizes, setSizes] = useState(MOCK_SIZES)
  const [colors, setColors] = useState(MOCK_COLORS)
  const [currency, setCurrency] = useState<CurrencyType>("USD")
  const [products, setProducts] = useState(MOCK_RELATED)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    })
    navigate("/checkout")
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${Date.now()}`,
      name: "New Product",
      price: 99.99,
      image: DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)],
    }
    setProducts([...products, newProduct])
    toast({
      title: "Product added",
      description: "A new product has been added to the catalog.",
    })
  }

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    })
    return formatter.format(numPrice)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            <ImageGallery images={DEFAULT_IMAGES} />
          </div>
          
          <div className="space-y-8 fade-in" style={{ animationDelay: "200ms" }}>
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                New Arrival
              </div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <Input
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="text-4xl font-bold"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold">{productName}</h1>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <CurrencySelector value={currency} onValueChange={setCurrency} />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <ReviewStars rating={4} />
                <span className="text-sm text-muted-foreground">(150 reviews)</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                {isEditing ? (
                  <Input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="text-3xl font-semibold w-32"
                  />
                ) : (
                  <p className="text-3xl font-semibold">
                    {formatPrice(productPrice)}
                  </p>
                )}
              </div>
              {isEditing && (
                <div className="space-y-4 mb-6">
                  <Textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Product description"
                    className="min-h-[100px]"
                  />
                </div>
              )}
              {!isEditing && (
                <p className="text-muted-foreground mb-6">
                  {productDescription}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">Size</label>
                <VariantSelector
                  variants={sizes}
                  selectedVariant={selectedSize}
                  onChange={setSelectedSize}
                  type="size"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Color</label>
                <VariantSelector
                  variants={colors}
                  selectedVariant={selectedColor}
                  onChange={setSelectedColor}
                  type="color"
                />
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <ProductManager
          products={products}
          onAddProduct={handleAddProduct}
          onRemoveProduct={handleRemoveProduct}
        />
      </main>
    </div>
  )
}

export default Index

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { ProductCard } from "./products/ProductCard"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "2",
    name: "Product 2",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
]

export const ProductManager = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)

  const onRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
    toast.success("Product removed successfully")
  }

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id
              ? { ...product, image: reader.result as string }
              : product
          )
        )
        toast.success("Image updated successfully")
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Products</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onRemove={onRemoveProduct}
            onImageUpload={handleImageUpload}
          />
        ))}
      </div>
    </div>
  )
}
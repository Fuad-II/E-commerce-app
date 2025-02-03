import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { ProductCard } from "./products/ProductCard"

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  description?: string
}

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([])

  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${Date.now()}`,
      name: "New Product",
      price: 0,
      image: "/placeholder.svg",
      description: "Product description"
    }
    setProducts([...products, newProduct])
    toast.success("Product added successfully")
  }

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
    toast.success("Product removed successfully")
  }

  const handleUpdateProductImages = (id: string, images: string[]) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, images, image: images[0] || p.image } : p
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={() => handleRemoveProduct(product.id)}
            onUpdateImages={(images) => handleUpdateProductImages(product.id, images)}
          />
        ))}
      </div>
    </div>
  )
}
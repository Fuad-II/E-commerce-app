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
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Products</h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your product catalog
          </p>
        </div>
        <Button 
          onClick={handleAddProduct}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
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
        {products.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new product
            </p>
            <Button 
              onClick={handleAddProduct}
              variant="outline" 
              className="mt-4"
            >
              Add your first product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
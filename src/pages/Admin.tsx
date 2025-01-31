import { ProductManager } from "@/components/admin/ProductManager"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { useState } from "react"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  description?: string
}

const Admin = () => {
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
    <AdminLayout>
      <div className="container py-8">
        <ProductManager
          products={products}
          onAddProduct={handleAddProduct}
          onRemoveProduct={handleRemoveProduct}
          onUpdateProductImages={handleUpdateProductImages}
        />
      </div>
    </AdminLayout>
  )
}

export default Admin
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
}

interface ProductManagerProps {
  products: Product[]
  onAddProduct: () => void
  onRemoveProduct: (id: string) => void
  onUpdateProductImages?: (id: string, images: string[]) => void
}

export const ProductManager = ({ 
  products, 
  onAddProduct, 
  onRemoveProduct,
  onUpdateProductImages 
}: ProductManagerProps) => {
  const handleImageUpload = async (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || !onUpdateProductImages) return

    const imageUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      
      await new Promise<void>((resolve) => {
        reader.onload = (e) => {
          if (e.target?.result) {
            imageUrls.push(e.target.result.toString())
          }
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }

    onUpdateProductImages(productId, imageUrls)
    toast.success("Images updated successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Product Management</h2>
        <Button onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
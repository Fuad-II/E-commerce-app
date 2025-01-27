import { Button } from "@/components/ui/button"
import { Plus, Trash2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

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
  const { toast } = useToast()

  const handleRemoveProduct = (id: string) => {
    onRemoveProduct(id)
    toast({
      title: "Product removed",
      description: "The product has been removed from the catalog.",
    })
  }

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
    toast({
      title: "Images updated",
      description: "Product images have been updated successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <Button onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="border rounded-lg p-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id={`image-upload-${product.id}`}
                    onChange={(e) => handleImageUpload(product.id, e)}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => document.getElementById(`image-upload-${product.id}`)?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-muted-foreground">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
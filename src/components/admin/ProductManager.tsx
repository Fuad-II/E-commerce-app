import { Button } from "@/components/ui/button"
import { Plus, Trash2, Upload } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
          <Card key={product.id} className="relative group">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => onRemoveProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-md mb-4"
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
              <p className="text-2xl font-semibold">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
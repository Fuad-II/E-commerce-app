import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Upload } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  description?: string
}

interface ProductCardProps {
  product: Product
  onRemove: () => void
  onUpdateImages: (images: string[]) => void
}

export const ProductCard = ({
  product,
  onRemove,
  onUpdateImages,
}: ProductCardProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const imageUrls = fileArray.map(file => URL.createObjectURL(file))
      onUpdateImages(imageUrls)
    }
  }

  return (
    <Card className="relative group">
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={onRemove}
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
              onChange={handleFileChange}
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
  )
}
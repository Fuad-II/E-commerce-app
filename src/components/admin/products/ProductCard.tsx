import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Upload } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  onRemove: (id: string) => void
  onImageUpload: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  onRemove,
  onImageUpload,
}: ProductCardProps) => {
  return (
    <Card className="relative group">
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={() => onRemove(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full aspect-square object-cover rounded-md mb-4"
          />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id={`image-upload-${id}`}
              onChange={(e) => onImageUpload(id, e)}
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => document.getElementById(`image-upload-${id}`)?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-2xl font-semibold">${price}</p>
      </CardContent>
    </Card>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Upload, Edit2 } from "lucide-react"
import { useState } from "react"

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
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map(file => URL.createObjectURL(file));
      onUpdateImages(imageUrls);
    }
  };

  return (
    <Card 
      className="relative group transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10 transition-opacity duration-300"
           style={{ opacity: isHovered ? 1 : 0 }}>
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Edit2 className="h-4 w-4 text-gray-600" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={onRemove}
          className="bg-red-500/90 backdrop-blur-sm hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <label htmlFor={`image-upload-${product.id}`} className="cursor-pointer">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Upload className="h-4 w-4 text-gray-600" />
            </Button>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            id={`image-upload-${product.id}`}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-xl font-semibold line-clamp-1">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500">
            ID: {product.id.slice(0, 8)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
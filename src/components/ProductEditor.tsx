import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Edit2, Save, X, Upload, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageGallery } from "./ImageGallery"
import { VariantManager } from "./VariantManager"

interface ProductEditorProps {
  productName: string
  productPrice: string
  productDescription: string
  onUpdateProduct: (name: string, price: string, description: string) => void
  images?: string[]
  onUpdateImages?: (images: string[]) => void
}

export const ProductEditor = ({
  productName,
  productPrice,
  productDescription,
  onUpdateProduct,
  images = [],
  onUpdateImages,
}: ProductEditorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(productName)
  const [price, setPrice] = useState(productPrice)
  const [description, setDescription] = useState(productDescription)
  const [productImages, setProductImages] = useState(images)
  const { toast } = useToast()

  const handleSave = () => {
    onUpdateProduct(name, price, description)
    setIsEditing(false)
    toast({
      title: "Changes saved",
      description: "Product details have been updated successfully.",
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || !onUpdateImages) return

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

    const newImages = [...productImages, ...imageUrls]
    setProductImages(newImages)
    onUpdateImages(newImages)
    toast({
      title: "Images updated",
      description: "Product images have been updated successfully.",
    })
  }

  const removeImage = (index: number) => {
    if (!onUpdateImages) return
    const newImages = productImages.filter((_, i) => i !== index)
    setProductImages(newImages)
    onUpdateImages(newImages)
    toast({
      title: "Image removed",
      description: "Product image has been removed successfully.",
    })
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{name}</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-3xl font-semibold">{price}</p>
        <p className="text-muted-foreground">{description}</p>
        {productImages.length > 0 && (
          <ImageGallery images={productImages} />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-4xl font-bold"
          placeholder="Product name"
        />
        <Button variant="ghost" size="icon" onClick={handleSave}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="text-3xl font-semibold w-32"
        placeholder="Price"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product description"
        className="min-h-[100px]"
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium">Product Images</label>
        <div className="flex flex-wrap gap-4">
          {productImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="image-upload"
              onChange={handleImageUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
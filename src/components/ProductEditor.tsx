import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Edit2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductEditorProps {
  productName: string
  productPrice: string
  productDescription: string
  onUpdateProduct: (name: string, price: string, description: string) => void
}

export const ProductEditor = ({
  productName,
  productPrice,
  productDescription,
  onUpdateProduct,
}: ProductEditorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(productName)
  const [price, setPrice] = useState(productPrice)
  const [description, setDescription] = useState(productDescription)
  const { toast } = useToast()

  const handleSave = () => {
    onUpdateProduct(name, price, description)
    setIsEditing(false)
    toast({
      title: "Changes saved",
      description: "Product details have been updated successfully.",
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
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductManagerProps {
  products: Product[]
  onAddProduct: () => void
  onRemoveProduct: (id: string) => void
}

export const ProductManager = ({ products, onAddProduct, onRemoveProduct }: ProductManagerProps) => {
  const { toast } = useToast()

  const handleRemoveProduct = (id: string) => {
    onRemoveProduct(id)
    toast({
      title: "Product removed",
      description: "The product has been removed from the catalog.",
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
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-muted-foreground">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
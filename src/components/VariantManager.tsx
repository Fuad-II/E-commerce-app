import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import { VariantSelector } from "./VariantSelector"
import { useToast } from "@/hooks/use-toast"

interface Variant {
  id: string
  name: string
  inStock: boolean
  colorName?: string
  colorHex?: string
}

interface VariantManagerProps {
  type: 'size' | 'color'
  variants: Variant[]
  selectedVariant: string
  onVariantChange: (id: string) => void
  onVariantsUpdate: (variants: Variant[]) => void
}

export const VariantManager = ({
  type,
  variants,
  selectedVariant,
  onVariantChange,
  onVariantsUpdate,
}: VariantManagerProps) => {
  const [newVariantName, setNewVariantName] = useState("")
  const [newColorName, setNewColorName] = useState("")
  const [newColorHex, setNewColorHex] = useState("#000000")
  const { toast } = useToast()

  const handleAddVariant = () => {
    if (!newVariantName) return

    const newVariant = {
      id: `${type}-${Date.now()}`,
      name: newVariantName,
      inStock: true,
      ...(type === 'color' && { 
        colorName: newColorName || newVariantName,
        colorHex: newColorHex
      }),
    }

    onVariantsUpdate([...variants, newVariant])
    setNewVariantName("")
    setNewColorName("")
    setNewColorHex("#000000")
    toast({
      title: "Variant added",
      description: `New ${type} variant has been added.`,
    })
  }

  const handleRemoveVariant = (id: string) => {
    onVariantsUpdate(variants.filter((v) => v.id !== id))
    toast({
      title: "Variant removed",
      description: `The ${type} variant has been removed.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium capitalize">{type}</label>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Input
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
            placeholder={`Add new ${type}`}
            className="w-32"
          />
          {type === 'color' && (
            <>
              <Input
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color name"
                className="w-32"
              />
              <Input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-16 p-1 h-10"
              />
            </>
          )}
          <Button size="icon" onClick={handleAddVariant}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <div key={variant.id} className="relative group">
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveVariant(variant.id)}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="flex flex-col items-center gap-1">
              <VariantSelector
                variants={[variant]}
                selectedVariant={selectedVariant}
                onChange={onVariantChange}
                type={type}
              />
              {type === 'color' && variant.colorName && (
                <span className="text-xs text-muted-foreground">{variant.colorName}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
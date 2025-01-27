import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  inStock: boolean;
  colorHex?: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onChange: (id: string) => void;
  type: 'size' | 'color';
}

export function VariantSelector({ variants, selectedVariant, onChange, type }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onChange(variant.id)}
          disabled={!variant.inStock}
          style={type === 'color' && variant.colorHex ? { backgroundColor: variant.colorHex } : undefined}
          className={cn(
            "variant-selector",
            type === 'color' ? 'w-9 h-9 rounded-full' : 'min-w-[3rem]',
            selectedVariant === variant.id
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:opacity-80",
            !variant.inStock && "opacity-50 cursor-not-allowed"
          )}
        >
          {type === 'size' ? variant.name : <span className="sr-only">{variant.name}</span>}
        </button>
      ))}
    </div>
  );
}
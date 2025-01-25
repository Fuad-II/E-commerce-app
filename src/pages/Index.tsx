import { useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { VariantSelector } from "@/components/VariantSelector";
import { ReviewStars } from "@/components/ReviewStars";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
];

const MOCK_SIZES = [
  { id: "s", name: "S", inStock: true },
  { id: "m", name: "M", inStock: true },
  { id: "l", name: "L", inStock: false },
  { id: "xl", name: "XL", inStock: true },
];

const MOCK_COLORS = [
  { id: "black", name: "Black", inStock: true },
  { id: "white", name: "White", inStock: true },
  { id: "gray", name: "Gray", inStock: true },
];

const MOCK_RELATED = [
  { id: "1", name: "Related Product 1", price: 99.99, image: MOCK_IMAGES[0] },
  { id: "2", name: "Related Product 2", price: 149.99, image: MOCK_IMAGES[1] },
  { id: "3", name: "Related Product 3", price: 199.99, image: MOCK_IMAGES[2] },
  { id: "4", name: "Related Product 4", price: 299.99, image: MOCK_IMAGES[3] },
];

const Index = () => {
  const [selectedSize, setSelectedSize] = useState(MOCK_SIZES[0].id);
  const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].id);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="fade-in">
            <ImageGallery images={MOCK_IMAGES} />
          </div>
          
          <div className="space-y-8 fade-in" style={{ animationDelay: "200ms" }}>
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                New Arrival
              </div>
              <h1 className="text-4xl font-bold mb-4">Premium Product Name</h1>
              <div className="flex items-center gap-4 mb-4">
                <ReviewStars rating={4} />
                <span className="text-sm text-muted-foreground">(150 reviews)</span>
              </div>
              <p className="text-3xl font-semibold mb-6">$299.99</p>
              <p className="text-muted-foreground">
                Experience unparalleled quality with our premium product. Crafted with
                attention to detail and designed for those who appreciate excellence.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <VariantSelector
                  variants={MOCK_SIZES}
                  selectedVariant={selectedSize}
                  onChange={setSelectedSize}
                  type="size"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <VariantSelector
                  variants={MOCK_COLORS}
                  selectedVariant={selectedColor}
                  onChange={setSelectedColor}
                  type="color"
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <section className="space-y-8 fade-in" style={{ animationDelay: "400ms" }}>
          <h2 className="text-2xl font-semibold">Related Products</h2>
          <RelatedProducts products={MOCK_RELATED} />
        </section>
      </main>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid sm:grid-cols-[80px,1fr] gap-4 sm:gap-6">
      <div className="flex sm:flex-col gap-4 order-2 sm:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden w-20",
              selectedImage === index && "ring-2 ring-black ring-offset-2"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="product-image hover:opacity-80"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg order-1 sm:order-2">
        <img
          src={images[selectedImage]}
          alt="Product main view"
          className="product-image w-full h-full"
        />
      </div>
    </div>
  );
}
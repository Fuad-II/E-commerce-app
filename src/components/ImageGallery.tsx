import { useState } from 'react';
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="image-gallery">
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden",
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
      <div className="main-image-container">
        <img
          src={images[selectedImage]}
          alt="Product main view"
          className="product-image w-full h-full"
        />
      </div>
    </div>
  );
}
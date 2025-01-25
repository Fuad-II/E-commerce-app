import { Star } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
}

export function ReviewStars({ rating }: ReviewStarsProps) {
  return (
    <div className="review-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={star <= rating ? "fill-current" : ""}
          size={16}
        />
      ))}
    </div>
  );
}
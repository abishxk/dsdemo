import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(rating) ? "fill-blue-bright text-blue-bright" : "fill-transparent text-white/20",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

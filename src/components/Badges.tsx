import { cn } from "@/lib/utils";

interface GenreTagProps {
  genre: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function GenreTag({ genre, isActive = false, onClick }: GenreTagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "genre-tag",
        isActive && "genre-tag-active"
      )}
    >
      {genre}
    </button>
  );
}

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusClass = () => {
    switch (status) {
      case 'Онгоинг':
        return 'status-ongoing';
      case 'Завершено':
        return 'status-completed';
      case 'Заморожено':
        return 'status-hiatus';
      case 'Анонс':
        return 'status-announced';
      default:
        return '';
    }
  };

  return (
    <span className={cn("status-badge", getStatusClass())}>
      {status}
    </span>
  );
}

interface RatingStarsProps {
  rating: number;
  showNumber?: boolean;
}

export function RatingStars({ rating, showNumber = true }: RatingStarsProps) {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;
  
  return (
    <div className="flex items-center gap-1">
      <div className="rating-stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={cn(
              "text-sm",
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400/50"
                : "text-muted-foreground/30"
            )}
          >
            ★
          </span>
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-yellow-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

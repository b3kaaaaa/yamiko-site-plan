import { Link } from "react-router-dom";
import { Star, Eye } from "lucide-react";
import { formatNumber, pluralize } from "@/lib/utils";
import type { Manga } from "@/lib/database";

interface MangaCardProps {
  manga: Manga;
  showChapters?: boolean;
  showRating?: boolean;
  showType?: boolean;
}

export function MangaCard({
  manga,
  showChapters = true,
  showRating = true,
  showType = true,
}: MangaCardProps) {
  return (
    <Link
      to={`/manga/${manga.id}`}
      className="group manga-card block"
    >
      <div className="manga-card-cover">
        <img
          src={manga.cover}
          alt={manga.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type Badge */}
        {showType && (
          <span className="manga-card-badge">{manga.type}</span>
        )}
        
        {/* Rating Badge */}
        {showRating && manga.rating > 0 && (
          <span className="manga-card-rating">
            <Star className="h-3 w-3 fill-current" />
            {manga.rating.toFixed(1)}
          </span>
        )}
        
        {/* Info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {manga.title}
          </h3>
          {showChapters && (
            <div className="mt-1.5 flex items-center gap-3 text-xs text-white/70">
              <span>
                {manga.chaptersCount} {pluralize(manga.chaptersCount, 'глава', 'главы', 'глав')}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatNumber(manga.views)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function MangaCardSkeleton() {
  return (
    <div className="manga-card">
      <div className="manga-card-cover">
        <div className="skeleton h-full w-full" />
      </div>
    </div>
  );
}

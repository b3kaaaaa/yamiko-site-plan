import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type { Manga } from "@/lib/database";

interface FeaturedBannerProps {
  manga: Manga;
}

export function FeaturedBanner({ manga }: FeaturedBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-card/50 border border-border/50">
      <div className="flex flex-col md:flex-row">
        {/* Left Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
            {manga.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 max-w-md">
            {manga.description}
          </p>
          <Link
            to={`/manga/${manga.id}`}
            className="inline-flex items-center gap-2 w-fit rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Play className="h-4 w-4" />
            Начать читать
          </Link>
        </div>
        
        {/* Right Image */}
        <div className="relative w-full md:w-80 h-48 md:h-auto">
          <img
            src={manga.cover}
            alt={manga.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card/50 via-transparent to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent md:hidden" />
        </div>
      </div>
    </div>
  );
}

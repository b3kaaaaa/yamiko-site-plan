import { Link } from "react-router-dom";
import type { Manga } from "@/lib/database";

interface MangaCardCompactProps {
  manga: Manga;
}

export function MangaCardCompact({ manga }: MangaCardCompactProps) {
  return (
    <Link
      to={`/manga/${manga.id}`}
      className="group flex-shrink-0 w-[130px]"
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
        <img
          src={manga.cover}
          alt={manga.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h4 className="text-xs font-medium line-clamp-2 leading-tight group-hover:text-primary transition-colors">
        {manga.title}
      </h4>
      <p className="text-[10px] text-muted-foreground mt-0.5">
        {manga.type} • {manga.genres[0]}
      </p>
    </Link>
  );
}

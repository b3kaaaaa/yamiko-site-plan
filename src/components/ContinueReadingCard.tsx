import { Link } from "react-router-dom";
import type { Manga, Chapter } from "@/lib/database";

interface ContinueReadingCardProps {
  manga: Manga;
  currentChapter: number;
  totalChapters: number;
}

export function ContinueReadingCard({ manga, currentChapter, totalChapters }: ContinueReadingCardProps) {
  const progress = (currentChapter / totalChapters) * 100;
  
  return (
    <Link
      to={`/manga/${manga.id}`}
      className="flex items-center gap-4 p-3 rounded-xl bg-card/50 border border-border/50 hover:bg-card/80 transition-colors min-w-[280px]"
    >
      <img
        src={manga.cover}
        alt={manga.title}
        className="w-12 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{manga.title}</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Прочитано {currentChapter} из {totalChapters}
        </p>
        <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

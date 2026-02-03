import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import type { Manga } from "@/lib/database";

interface UpdateItem {
  manga: Manga;
  chapterNumber: number;
  chapterTitle: string;
  translator: string;
  updatedAt: string;
}

interface LatestUpdatesProps {
  updates: UpdateItem[];
}

export function LatestUpdates({ updates }: LatestUpdatesProps) {
  return (
    <div className="space-y-2">
      {updates.map((update, index) => (
        <Link
          key={`${update.manga.id}-${update.chapterNumber}-${index}`}
          to={`/manga/${update.manga.id}`}
          className="flex items-start gap-4 p-3 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 transition-colors"
        >
          <img
            src={update.manga.cover}
            alt={update.manga.title}
            className="w-14 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0 py-1">
            <h4 className="text-sm font-medium truncate">{update.manga.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Том 1 Глава {update.chapterNumber}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-primary flex items-center gap-1">
                <User className="h-3 w-3" />
                {update.translator}
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {update.updatedAt}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MangaCard } from "./MangaCard";
import type { Manga } from "@/lib/database";

interface MangaSectionProps {
  title: string;
  manga: Manga[];
  viewAllLink?: string;
  viewAllText?: string;
}

export function MangaSection({
  title,
  manga,
  viewAllLink,
  viewAllText = "Смотреть все",
}: MangaSectionProps) {
  if (manga.length === 0) return null;

  return (
    <section className="py-8">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="section-link flex items-center gap-1 hover:gap-2 transition-all"
          >
            {viewAllText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {manga.map((m) => (
          <MangaCard key={m.id} manga={m} />
        ))}
      </div>
    </section>
  );
}

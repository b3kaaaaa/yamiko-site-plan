import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
}

export function SectionHeader({ title, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          Все
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <div className="mb-8">
          <span className="text-8xl font-bold text-primary">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Страница не найдена</h1>
        
        <p className="text-muted-foreground mb-8">
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            На главную
          </Link>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-all hover:bg-secondary"
          >
            <BookOpen className="h-5 w-5" />
            В каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

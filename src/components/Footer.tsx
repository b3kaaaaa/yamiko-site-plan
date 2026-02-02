import { Link } from "react-router-dom";
import { BookOpen, Github, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                <span className="text-primary">Yami</span>ko
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Yamiko — бесплатная читалка манги, манхвы и маньхуа. 
              Читайте любимые тайтлы онлайн в высоком качестве.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/catalog?sort=popular" className="hover:text-primary transition-colors">
                  Популярное
                </Link>
              </li>
              <li>
                <Link to="/catalog?sort=new" className="hover:text-primary transition-colors">
                  Новинки
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@yamiko.ru
                </span>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Yamiko. Все права защищены.</p>
          <p className="flex items-center gap-1">
            Сделано с <Heart className="h-4 w-4 text-primary fill-primary" /> для любителей манги
          </p>
        </div>
      </div>
    </footer>
  );
}

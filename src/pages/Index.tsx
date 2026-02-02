import { Link } from "react-router-dom";
import { Play, Star, Eye, BookOpen } from "lucide-react";
import { getPopularManga, getRecentlyUpdated, getTopRated, getGenres } from "@/lib/database";
import { formatNumber } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MangaSection } from "@/components/MangaSection";
import { GenreTag } from "@/components/Badges";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const popularManga = getPopularManga(6);
  const recentManga = getRecentlyUpdated(6);
  const topRated = getTopRated(6);
  const genres = getGenres().slice(0, 12);
  
  // Featured manga for hero
  const featured = popularManga[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Star className="h-4 w-4 fill-current" />
              Добро пожаловать в Yamiko
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Читай <span className="text-gradient">мангу</span> онлайн
              <br />бесплатно
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Тысячи тайтлов манги, манхвы и маньхуа. 
              Удобный ридер, регулярные обновления и никакой рекламы.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 glow-primary"
              >
                <BookOpen className="h-5 w-5" />
                Открыть каталог
              </Link>
              
              {featured && (
                <Link
                  to={`/manga/${featured.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-6 py-3 font-semibold transition-all hover:bg-secondary"
                >
                  <Play className="h-5 w-5" />
                  Начать читать
                </Link>
              )}
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">8+</div>
                <div className="text-sm text-muted-foreground">Тайтлов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1K+</div>
                <div className="text-sm text-muted-foreground">Глав</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">45K+</div>
                <div className="text-sm text-muted-foreground">Читателей</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container flex-1">
        {/* Genres Quick Filter */}
        <section className="py-8">
          <h2 className="section-title mb-4">Жанры</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link key={genre} to={`/catalog?genre=${encodeURIComponent(genre)}`}>
                <GenreTag genre={genre} />
              </Link>
            ))}
            <Link to="/catalog">
              <span className="genre-tag">Все жанры →</span>
            </Link>
          </div>
        </section>

        {/* Popular Section */}
        <MangaSection
          title="🔥 Популярное"
          manga={popularManga}
          viewAllLink="/catalog?sort=popular"
        />

        {/* Recently Updated */}
        <MangaSection
          title="📖 Недавно обновлённые"
          manga={recentManga}
          viewAllLink="/catalog?sort=updated"
        />

        {/* Top Rated */}
        <MangaSection
          title="⭐ Лучший рейтинг"
          manga={topRated}
          viewAllLink="/catalog?sort=rating"
        />

        {/* Featured Manga Banner */}
        {featured && (
          <section className="py-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card to-card/50 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-40 md:w-48 rounded-lg shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    Рекомендуем
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{featured.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      {featured.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatNumber(featured.views)}
                    </span>
                    <span>{featured.chaptersCount} глав</span>
                  </div>
                  <Link
                    to={`/manga/${featured.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Читать сейчас
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;

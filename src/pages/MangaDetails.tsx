import { useParams, Link } from "react-router-dom";
import { 
  Star, Eye, Clock, User, Palette, Calendar, 
  BookOpen, ArrowLeft, ChevronRight, Heart
} from "lucide-react";
import { 
  getMangaById, 
  getChaptersByMangaId, 
  getFirstChapter 
} from "@/lib/database";
import { formatNumber, formatDate, pluralize } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GenreTag, StatusBadge, RatingStars } from "@/components/Badges";

const MangaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const manga = id ? getMangaById(id) : null;
  const chapters = id ? getChaptersByMangaId(id) : [];
  const firstChapter = id ? getFirstChapter(id) : null;

  if (!manga) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="container flex-1 py-8">
          <div className="empty-state">
            <div className="empty-state-icon">😕</div>
            <div className="empty-state-title">Манга не найдена</div>
            <Link to="/catalog" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Вернуться в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={manga.cover}
          alt={manga.title}
          className="h-full w-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <main className="container relative -mt-32 md:-mt-48 z-10 pb-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Cover */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={manga.cover}
              alt={manga.title}
              className="w-48 md:w-56 rounded-xl shadow-2xl ring-1 ring-border"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            {/* Title */}
            <div className="text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {manga.type}
                </span>
                <StatusBadge status={manga.status} />
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{manga.title}</h1>
              
              {manga.altTitles.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  {manga.altTitles.join(' / ')}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6 text-sm">
              <div className="flex items-center gap-2">
                <RatingStars rating={manga.rating} />
                <span className="text-muted-foreground">
                  ({formatNumber(manga.ratingCount)} оценок)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Eye className="h-4 w-4" />
                {formatNumber(manga.views)} просмотров
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {manga.chaptersCount} {pluralize(manga.chaptersCount, 'глава', 'главы', 'глав')}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
              {firstChapter ? (
                <Link
                  to={`/reader/${manga.id}/${firstChapter.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 glow-primary"
                >
                  <BookOpen className="h-5 w-5" />
                  Читать
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-6 py-3 font-semibold text-muted-foreground cursor-not-allowed">
                  <BookOpen className="h-5 w-5" />
                  Нет глав
                </span>
              )}
              <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-all hover:bg-secondary hover:border-primary/50">
                <Heart className="h-5 w-5" />
                В закладки
              </button>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {manga.author && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Автор: <span className="text-foreground">{manga.author}</span></span>
                </div>
              )}
              {manga.artist && manga.artist !== manga.author && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Palette className="h-4 w-4" />
                  <span>Художник: <span className="text-foreground">{manga.artist}</span></span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Год: <span className="text-foreground">{manga.year}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Обновлено: <span className="text-foreground">{formatDate(manga.updatedAt, 'relative')}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Жанры</h2>
          <div className="flex flex-wrap gap-2">
            {manga.genres.map((genre) => (
              <Link key={genre} to={`/catalog?genre=${encodeURIComponent(genre)}`}>
                <GenreTag genre={genre} />
              </Link>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Описание</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {manga.description || 'Описание отсутствует'}
          </p>
        </section>

        {/* Chapters List */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Главы ({chapters.length})
            </h2>
          </div>

          {chapters.length > 0 ? (
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/reader/${manga.id}/${chapter.id}`}
                  className="chapter-item group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {chapter.volume ? `Том ${chapter.volume} ` : ''}
                      Глава {chapter.number}
                    </span>
                    {chapter.title && (
                      <span className="text-muted-foreground">— {chapter.title}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{chapter.pages.length} стр.</span>
                    <span>{formatDate(chapter.createdAt, 'relative')}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Главы пока не добавлены
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MangaDetails;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, Eye, Clock, User, Palette, Calendar, 
  BookOpen, ArrowLeft, ChevronRight, Heart, MessageCircle,
  Bookmark, Share2, Flame, TrendingUp, MapPin
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

type MangaTab = "chapters" | "maps" | "reviews" | "discussions" | "comments";

const MangaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const manga = id ? getMangaById(id) : null;
  const chapters = id ? getChaptersByMangaId(id) : [];
  const firstChapter = id ? getFirstChapter(id) : null;
  const [activeTab, setActiveTab] = useState<MangaTab>("chapters");
  const [isBookmarked, setIsBookmarked] = useState(false);

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

            {/* Stats Extra */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">{formatNumber(Math.floor(Math.random() * 5000) + 1000)} лайков</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-amber-500" />
                <span className="text-muted-foreground">{formatNumber(Math.floor(Math.random() * 3000) + 500)} закладок</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">{formatNumber(Math.floor(Math.random() * 1000) + 100)} комментов</span>
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
                  Начать читать
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-6 py-3 font-semibold text-muted-foreground cursor-not-allowed">
                  <BookOpen className="h-5 w-5" />
                  Нет глав
                </span>
              )}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-all ${
                  isBookmarked
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border bg-card text-foreground hover:bg-secondary hover:border-primary/50"
                }`}
              >
                <Heart className="h-5 w-5" />
                {isBookmarked ? "В закладках" : "В закладки"}
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-all hover:bg-secondary hover:border-primary/50">
                <Share2 className="h-5 w-5" />
                Поделиться
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

        {/* Additional Info */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-secondary/30 border border-border">
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Статус: </span>
                <span className="font-medium"><StatusBadge status={manga.status} /></span>
              </div>
              <div>
                <span className="text-muted-foreground">Тип: </span>
                <span className="font-medium">{manga.type}</span>
              </div>
              {manga.altTitles.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Альтернативные названия: </span>
                  <span className="font-medium">{manga.altTitles.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-lg bg-secondary/30 border border-border">
            <h3 className="text-lg font-semibold mb-4">Похожие проекты</h3>
            <div className="space-y-2">
              <Link to="/catalog" className="block text-primary hover:underline text-sm">
                Solo Leveling
              </Link>
              <Link to="/catalog" className="block text-primary hover:underline text-sm">
                The Beginning After The End
              </Link>
              <Link to="/catalog" className="block text-primary hover:underline text-sm">
                Omniscient Reader
              </Link>
            </div>
          </div>
        </section>

        {/* Genres */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Жанры и теги</h2>
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

        {/* Tab Navigation */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-6">
            <button
              onClick={() => setActiveTab("chapters")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "chapters"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Главы ({chapters.length})
            </button>
            <button
              onClick={() => setActiveTab("maps")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "maps"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Карты
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Отзывы
            </button>
            <button
              onClick={() => setActiveTab("discussions")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "discussions"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Обсуждения
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "comments"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Комменты
            </button>
          </div>

          {/* Chapters Tab */}
          {activeTab === "chapters" && (
            <div>
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
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  Главы пока не добавлены
                </div>
              )}
            </div>
          )}

          {/* Maps Tab */}
          {activeTab === "maps" && (
            <div className="text-center py-12 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
              Карты персонажей и мира скоро появятся
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                        alt="reviewer"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">User{i}</h4>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2024-09-{10 + i}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Amazing manga! The plot is incredible and the characters are well developed.
                  </p>
                  <div className="flex gap-4 mt-3">
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      👍 Helpful (23)
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      👎 Not helpful (2)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Discussion Topic {i}</h4>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {Math.floor(Math.random() * 50) + 5} replies
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    What do you think about the latest chapter? Share your theories!
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>By User{i}</span>
                    <span>•</span>
                    <span>2024-09-{10 + i}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt="commenter"
                      className="w-9 h-9 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">User{i}</h4>
                        <span className="text-xs text-muted-foreground">2024-09-{10 + i}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        This chapter was amazing! The plot twist caught me off guard.
                      </p>
                      <button className="text-xs text-primary hover:underline mt-2">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MangaDetails;

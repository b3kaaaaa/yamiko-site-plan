import { Link } from "react-router-dom";
import { getPopularManga, getRecentlyUpdated, getTopRated, getGenres, getAllManga } from "@/lib/database";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GenreTag } from "@/components/Badges";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { ContinueReadingCard } from "@/components/ContinueReadingCard";
import { LatestUpdates } from "@/components/LatestUpdates";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { MangaCardCompact } from "@/components/MangaCardCompact";
import { SectionHeader } from "@/components/SectionHeader";

const Index = () => {
  const popularManga = getPopularManga(10);
  const recentManga = getRecentlyUpdated(10);
  const topRated = getTopRated(10);
  const allManga = getAllManga();
  const genres = getGenres().slice(0, 12);
  
  // Featured manga for banner
  const featured = popularManga[0];

  // Mock continue reading data (would come from user's reading history)
  const continueReading = allManga.slice(0, 4).map((manga, index) => ({
    manga,
    currentChapter: Math.floor(Math.random() * manga.chaptersCount) + 1,
    totalChapters: manga.chaptersCount,
  }));

  // Mock latest updates
  const latestUpdates = recentManga.slice(0, 6).map((manga, index) => ({
    manga,
    chapterNumber: manga.chaptersCount,
    chapterTitle: `Глава ${manga.chaptersCount}`,
    translator: "Yamiko",
    updatedAt: index === 0 ? "1 час назад" : index < 3 ? `${index + 2} часа назад` : `${index + 1} часов назад`,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container flex-1 py-6 space-y-8">
        {/* Featured Banner */}
        {featured && <FeaturedBanner manga={featured} />}

        {/* Genres Quick Filter */}
        <section>
          <SectionHeader title="Жанры" viewAllLink="/catalog" />
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link key={genre} to={`/catalog?genre=${encodeURIComponent(genre)}`}>
                <GenreTag genre={genre} />
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Today */}
        <section>
          <SectionHeader title="Популярное сегодня" viewAllLink="/catalog?sort=popular" />
          <HorizontalScroll>
            {popularManga.map((manga) => (
              <MangaCardCompact key={manga.id} manga={manga} />
            ))}
          </HorizontalScroll>
        </section>

        {/* Continue Reading */}
        <section>
          <SectionHeader title="Продолжить чтение" />
          <HorizontalScroll>
            {continueReading.map((item, index) => (
              <ContinueReadingCard
                key={`${item.manga.id}-${index}`}
                manga={item.manga}
                currentChapter={item.currentChapter}
                totalChapters={item.totalChapters}
              />
            ))}
          </HorizontalScroll>
        </section>

        {/* Hot New Projects */}
        <section>
          <SectionHeader title="Горячие новинки" viewAllLink="/catalog?sort=new" />
          <HorizontalScroll>
            {topRated.map((manga) => (
              <MangaCardCompact key={manga.id} manga={manga} />
            ))}
          </HorizontalScroll>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Updates */}
          <div className="lg:col-span-2">
            <SectionHeader title="Последние обновления" viewAllLink="/catalog?sort=updated" />
            <LatestUpdates updates={latestUpdates} />
          </div>

          {/* Sidebar - Recently Updated Cards */}
          <div>
            <SectionHeader title="Недавно обновлённые" viewAllLink="/catalog?sort=updated" />
            <div className="space-y-3">
              {recentManga.slice(0, 5).map((manga) => (
                <Link
                  key={manga.id}
                  to={`/manga/${manga.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <img
                    src={manga.cover}
                    alt={manga.title}
                    className="w-10 h-14 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{manga.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {manga.chaptersCount} глав
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Top Rated Section */}
        <section>
          <SectionHeader title="Лучший рейтинг" viewAllLink="/catalog?sort=rating" />
          <HorizontalScroll>
            {topRated.map((manga) => (
              <MangaCardCompact key={`rated-${manga.id}`} manga={manga} />
            ))}
          </HorizontalScroll>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

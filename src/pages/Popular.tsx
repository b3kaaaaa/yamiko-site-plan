import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MangaCard } from "@/components/MangaCard";
import { getPopularManga } from "@/lib/database";
import { Flame, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

type TimeFilter = 'today' | 'week' | 'month' | 'all';

const Popular = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const popularManga = getPopularManga(20);

  const timeFilters: { value: TimeFilter; label: string }[] = [
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'all', label: 'Всё время' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container flex-1 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Популярное</h1>
              <p className="text-sm text-muted-foreground">Самые читаемые тайтлы</p>
            </div>
          </div>

          {/* Time Filter */}
          <div className="flex gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTimeFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeFilter === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-muted-foreground hover:bg-card"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold">45.2K</p>
            <p className="text-xs text-muted-foreground">Просмотров</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold">128</p>
            <p className="text-xs text-muted-foreground">Новых глав</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Flame className="h-5 w-5 text-orange-500 mx-auto mb-2" />
            <p className="text-lg font-bold">8</p>
            <p className="text-xs text-muted-foreground">Тайтлов</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-bold">+23%</p>
            <p className="text-xs text-muted-foreground">Рост</p>
          </div>
        </div>

        {/* Manga Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {popularManga.map((manga, index) => (
            <div key={manga.id} className="relative">
              {index < 3 && (
                <span className={`absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? "bg-yellow-500 text-yellow-950" :
                  index === 1 ? "bg-gray-300 text-gray-800" :
                  "bg-amber-600 text-white"
                }`}>
                  {index + 1}
                </span>
              )}
              <MangaCard manga={manga} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Popular;

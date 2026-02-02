import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, Grid, List, ChevronDown } from "lucide-react";
import { filterManga, getGenres, getTypes, getStatuses } from "@/lib/database";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MangaCard } from "@/components/MangaCard";
import { GenreTag } from "@/components/Badges";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: 'updated', label: 'По обновлению' },
  { value: 'popular', label: 'По популярности' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'new', label: 'По дате добавления' },
  { value: 'title', label: 'По алфавиту' },
];

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get filter values from URL
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  const status = searchParams.get('status') || '';
  const genre = searchParams.get('genre') || '';
  const sort = searchParams.get('sort') || 'updated';

  // Get filter options
  const genres = getGenres();
  const types = getTypes();
  const statuses = getStatuses();

  // Filter manga
  const filteredManga = useMemo(() => {
    return filterManga({
      search,
      type: type || undefined,
      status: status || undefined,
      genres: genre ? [genre] : undefined,
      sort: sort as any,
    });
  }, [search, type, status, genre, sort]);

  // Update URL params
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = search || type || status || genre;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container flex-1 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Каталог манги</h1>
          <p className="text-muted-foreground">
            Найдено {filteredManga.length} тайтлов
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center gap-2 h-10 px-4 rounded-lg border border-border bg-card text-sm font-medium transition-colors",
              isFilterOpen ? "border-primary text-primary" : "hover:border-primary/50"
            )}
          >
            <Filter className="h-4 w-4" />
            Фильтры
            {hasFilters && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                !
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="h-10 appearance-none rounded-lg border border-border bg-card pl-4 pr-10 text-sm focus:border-primary focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === 'grid' ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === 'list' ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {isFilterOpen && (
          <div className="mb-6 p-6 rounded-xl border border-border bg-card fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Тип</label>
                <select
                  value={type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="">Все типы</option>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Статус</label>
                <select
                  value={status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="">Любой статус</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="h-10 px-4 rounded-lg border border-border bg-background text-sm font-medium hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>

            {/* Genre Tags */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-3">Жанры</label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <GenreTag
                    key={g}
                    genre={g}
                    isActive={genre === g}
                    onClick={() => updateFilter('genre', genre === g ? '' : g)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {search && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
                Поиск: {search}
                <button onClick={() => updateFilter('search', '')} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {type && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
                {type}
                <button onClick={() => updateFilter('type', '')} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {status && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
                {status}
                <button onClick={() => updateFilter('status', '')} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {genre && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm">
                {genre}
                <button onClick={() => updateFilter('genre', '')} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {filteredManga.length > 0 ? (
          <div
            className={cn(
              viewMode === 'grid'
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                : "flex flex-col gap-4"
            )}
          >
            {filteredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <div className="empty-state-title">Ничего не найдено</div>
            <div className="empty-state-text">
              Попробуйте изменить параметры поиска или сбросить фильтры
            </div>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;

import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, BookOpen, User, Bell, Bookmark } from "lucide-react";
import { useState, useCallback } from "react";
import { searchManga, type Manga } from "@/lib/database";
import { currentUser } from "@/lib/mockData";
import { debounce } from "@/lib/utils";
import { UserMenu } from "@/components/UserMenu";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length >= 2) {
        const results = searchManga(query).slice(0, 5);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              <span className="text-primary">Yami</span>ko
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/catalog") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Каталог
            </Link>
            <Link
              to="/popular"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/popular") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Популярное
            </Link>
            <Link
              to="/guilds"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/guilds") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Гильдии
            </Link>
          </nav>

          {/* Search */}
          <div className="relative hidden md:block flex-1 max-w-xs">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск манги..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="h-9 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </form>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-border bg-popover shadow-lg overflow-hidden z-50">
                {searchResults.map((manga) => (
                  <Link
                    key={manga.id}
                    to={`/manga/${manga.id}`}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-accent/10"
                  >
                    <img
                      src={manga.cover}
                      alt={manga.title}
                      className="h-12 w-9 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-medium">{manga.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {manga.type} • {manga.chaptersCount} глав
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Bookmark className="h-5 w-5" />
              {currentUser.bookmarks > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              )}
            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {currentUser.notifications > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {currentUser.notifications}
                </span>
              )}
            </Link>

            {/* Profile Avatar */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 rounded-full hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full border border-border"
              />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search & Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container py-4 flex flex-col gap-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск манги..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="h-10 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </form>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/catalog") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Каталог
              </Link>
              <Link
                to="/popular"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/popular") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Популярное
              </Link>
              <Link
                to="/guilds"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive("/guilds") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Гильдии
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* User Menu Sidebar */}
      <UserMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

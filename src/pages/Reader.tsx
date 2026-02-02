import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, X, Settings, Maximize2, 
  Minimize2, List, ArrowUp
} from "lucide-react";
import { 
  getMangaById, 
  getChapterById, 
  getChaptersByMangaId,
  getNextChapter, 
  getPrevChapter 
} from "@/lib/database";
import { cn } from "@/lib/utils";

type ReaderMode = 'vertical' | 'horizontal' | 'single';
type ReaderFit = 'width' | 'height' | 'original';
type ReaderBg = 'black' | 'dark' | 'white';

const Reader = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>();
  const navigate = useNavigate();

  const manga = mangaId ? getMangaById(mangaId) : null;
  const chapter = chapterId ? getChapterById(chapterId) : null;
  const chapters = mangaId ? getChaptersByMangaId(mangaId) : [];
  const nextChapter = mangaId && chapter ? getNextChapter(mangaId, chapter.number) : null;
  const prevChapter = mangaId && chapter ? getPrevChapter(mangaId, chapter.number) : null;

  // State
  const [currentPage, setCurrentPage] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Reader settings
  const [mode, setMode] = useState<ReaderMode>('vertical');
  const [fit, setFit] = useState<ReaderFit>('width');
  const [bg, setBg] = useState<ReaderBg>('black');

  // Pages
  const pages = chapter?.pages || [];
  const totalPages = pages.length;

  // Navigation
  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const goNext = useCallback(() => {
    if (mode === 'vertical') {
      // In vertical mode, scroll down
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    } else {
      if (currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
      } else if (nextChapter) {
        navigate(`/reader/${mangaId}/${nextChapter.id}`);
      }
    }
  }, [mode, currentPage, totalPages, nextChapter, mangaId, navigate, goToPage]);

  const goPrev = useCallback(() => {
    if (mode === 'vertical') {
      window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
    } else {
      if (currentPage > 0) {
        goToPage(currentPage - 1);
      } else if (prevChapter) {
        navigate(`/reader/${mangaId}/${prevChapter.id}`);
      }
    }
  }, [mode, currentPage, prevChapter, mangaId, navigate, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, isFullscreen]);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Click zones
  const handlePageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const third = width / 3;

    if (x < third) {
      goPrev();
    } else if (x > third * 2) {
      goNext();
    } else {
      setShowUI(!showUI);
    }
  };

  // Background color
  const getBgClass = () => {
    switch (bg) {
      case 'black': return 'bg-black';
      case 'dark': return 'bg-zinc-900';
      case 'white': return 'bg-white';
    }
  };

  // Fit class
  const getFitClass = () => {
    switch (fit) {
      case 'width': return 'w-full h-auto';
      case 'height': return 'h-screen w-auto';
      case 'original': return '';
    }
  };

  if (!manga || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl mb-4">Глава не найдена</p>
          <Link to="/" className="text-primary hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("fixed inset-0 z-50", getBgClass())}>
      {/* Top Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm transition-transform duration-300",
          showUI ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* Left - Back & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/manga/${mangaId}`}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-sm font-medium text-white truncate">{manga.title}</h1>
            <p className="text-xs text-white/70">
              Глава {chapter.number} {chapter.title && `— ${chapter.title}`}
            </p>
          </div>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            title="Список глав"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            title="Настройки"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            title="Полный экран"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-50 w-72 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl p-4 fade-in">
          <h3 className="text-sm font-semibold text-white mb-4">Настройки чтения</h3>
          
          {/* Mode */}
          <div className="mb-4">
            <label className="block text-xs text-zinc-400 mb-2">Режим чтения</label>
            <div className="grid grid-cols-3 gap-2">
              {(['vertical', 'horizontal', 'single'] as ReaderMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-medium transition-colors",
                    mode === m ? "bg-primary text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  )}
                >
                  {m === 'vertical' ? 'Вертик.' : m === 'horizontal' ? 'Гориз.' : 'По одной'}
                </button>
              ))}
            </div>
          </div>

          {/* Fit */}
          <div className="mb-4">
            <label className="block text-xs text-zinc-400 mb-2">Размер страниц</label>
            <div className="grid grid-cols-3 gap-2">
              {(['width', 'height', 'original'] as ReaderFit[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFit(f)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-medium transition-colors",
                    fit === f ? "bg-primary text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  )}
                >
                  {f === 'width' ? 'По ширине' : f === 'height' ? 'По высоте' : 'Оригинал'}
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-xs text-zinc-400 mb-2">Фон</label>
            <div className="grid grid-cols-3 gap-2">
              {(['black', 'dark', 'white'] as ReaderBg[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBg(b)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-medium transition-colors",
                    bg === b ? "bg-primary text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  )}
                >
                  {b === 'black' ? 'Чёрный' : b === 'dark' ? 'Тёмный' : 'Белый'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter List Panel */}
      {showChapterList && (
        <div className="fixed top-16 right-4 z-50 w-72 max-h-96 overflow-y-auto rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl fade-in">
          <div className="p-3 border-b border-zinc-700">
            <h3 className="text-sm font-semibold text-white">Список глав</h3>
          </div>
          <div className="p-2">
            {chapters.map((ch) => (
              <Link
                key={ch.id}
                to={`/reader/${mangaId}/${ch.id}`}
                onClick={() => setShowChapterList(false)}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                  ch.id === chapterId
                    ? "bg-primary text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                )}
              >
                Глава {ch.number} {ch.title && `— ${ch.title}`}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div
        className={cn(
          "h-full overflow-auto",
          mode === 'vertical' ? 'pt-16 pb-20' : 'flex items-center justify-center pt-16 pb-20'
        )}
        onClick={mode !== 'vertical' ? handlePageClick : undefined}
      >
        {mode === 'vertical' ? (
          // Vertical mode - all pages stacked
          <div className="max-w-3xl mx-auto">
            {pages.map((page, index) => (
              <img
                key={index}
                src={page}
                alt={`Страница ${index + 1}`}
                className={cn("w-full", bg === 'white' ? 'text-black' : '')}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            ))}
            
            {/* End of chapter */}
            <div className="py-12 text-center">
              <p className="text-zinc-400 mb-4">Конец главы {chapter.number}</p>
              <div className="flex gap-4 justify-center">
                {prevChapter && (
                  <Link
                    to={`/reader/${mangaId}/${prevChapter.id}`}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                  >
                    ← Предыдущая
                  </Link>
                )}
                {nextChapter && (
                  <Link
                    to={`/reader/${mangaId}/${nextChapter.id}`}
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Следующая →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Horizontal / Single mode - one page at a time
          <div className="relative flex items-center justify-center h-full px-12">
            {pages[currentPage] && (
              <img
                src={pages[currentPage]}
                alt={`Страница ${currentPage + 1}`}
                className={cn(getFitClass(), "max-h-full object-contain")}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-black/80 backdrop-blur-sm transition-transform duration-300",
          showUI ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between gap-4 max-w-3xl mx-auto">
          {/* Previous */}
          <div className="flex items-center gap-2">
            {prevChapter ? (
              <Link
                to={`/reader/${mangaId}/${prevChapter.id}`}
                className="p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <span className="p-2 rounded-lg bg-zinc-800/50 text-zinc-600">
                <ChevronLeft className="h-5 w-5" />
              </span>
            )}
          </div>

          {/* Progress */}
          {mode !== 'vertical' && (
            <div className="flex-1 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={totalPages - 1}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="flex-1 h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
              />
              <span className="text-sm text-white tabular-nums min-w-[60px] text-right">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          )}

          {mode === 'vertical' && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
              Наверх
            </button>
          )}

          {/* Next */}
          <div className="flex items-center gap-2">
            {nextChapter ? (
              <Link
                to={`/reader/${mangaId}/${nextChapter.id}`}
                className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <span className="p-2 rounded-lg bg-zinc-800/50 text-zinc-600">
                <ChevronRight className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;

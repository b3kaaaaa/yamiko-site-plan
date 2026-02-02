// ============================================
// YAMIKO - Manga Database Service Layer
// localStorage-based data management
// ============================================

export interface Manga {
  id: string;
  slug: string;
  title: string;
  altTitles: string[];
  description: string;
  cover: string;
  type: 'Манга' | 'Манхва' | 'Маньхуа' | 'OEL' | 'Руманга';
  status: 'Онгоинг' | 'Завершено' | 'Заморожено' | 'Анонс';
  year: number;
  author: string;
  artist: string;
  genres: string[];
  views: number;
  rating: number;
  ratingCount: number;
  chaptersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  mangaId: string;
  number: number;
  volume: number | null;
  title: string;
  pages: string[];
  translator: string;
  views: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: 'user' | 'moderator' | 'admin' | 'uploader';
  isPremium: boolean;
  premiumUntil: string | null;
  createdAt: string;
  lastActive: string;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  readerMode: 'vertical' | 'horizontal' | 'single';
  readerFit: 'width' | 'height' | 'original';
  readerBg: 'black' | 'dark' | 'white';
}

export interface Bookmark {
  id: string;
  oderId: string;
  mangaId: string;
  status: 'reading' | 'planned' | 'completed' | 'dropped' | 'favorite';
  lastChapter: string | null;
  lastPage: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingHistory {
  id: string;
  oderId: string;
  mangaId: string;
  chapterId: string;
  page: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  theme: string;
  itemsPerPage: number;
  allowRegistration: boolean;
  maintenanceMode: boolean;
}

export interface FilterOptions {
  search?: string;
  type?: string;
  status?: string;
  year?: number;
  genres?: string[];
  minRating?: number;
  hasChapters?: boolean;
  sort?: 'rating' | 'popular' | 'views' | 'updated' | 'new' | 'created' | 'title' | 'alphabetical' | 'chapters';
}

export interface StorageInfo {
  used: number;
  usedMB: string;
  limit: number;
  limitMB: string;
  available: number;
  availableMB: string;
  percentUsed: string;
}

const STORAGE_LIMIT = 5 * 1024 * 1024; // 5MB

const GENRES = [
  'Экшен', 'Романтика', 'Комедия', 'Драма', 'Фэнтези',
  'Ужасы', 'Спорт', 'Повседневность', 'Приключения',
  'Фантастика', 'Детектив', 'Психология', 'Триллер',
  'Школа', 'Сёнен', 'Сёдзё', 'Сэйнен', 'Дзёсей',
  'Исекай', 'Боевые искусства', 'Меха', 'Музыка',
  'Гарем', 'Этти', 'Трагедия', 'Исторический'
];

const TYPES = ['Манга', 'Манхва', 'Маньхуа', 'OEL', 'Руманга'];
const STATUSES = ['Онгоинг', 'Завершено', 'Заморожено', 'Анонс'];

// Utility functions
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getData<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
    return null;
  }
}

function setData<T>(key: string, value: T): boolean {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
    return true;
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
    return false;
  }
}

function getStorageSize(): number {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length * 2;
    }
  }
  return total;
}

function getStorageInfo(): StorageInfo {
  const used = getStorageSize();
  return {
    used,
    usedMB: (used / (1024 * 1024)).toFixed(2),
    limit: STORAGE_LIMIT,
    limitMB: (STORAGE_LIMIT / (1024 * 1024)).toFixed(2),
    available: STORAGE_LIMIT - used,
    availableMB: ((STORAGE_LIMIT - used) / (1024 * 1024)).toFixed(2),
    percentUsed: ((used / STORAGE_LIMIT) * 100).toFixed(1),
  };
}

// Initialize database with demo data
function initDatabase(): void {
  if (localStorage.getItem('yamiko_db_initialized')) return;

  // Initialize empty arrays
  setData('mangas', getDemoManga());
  setData('chapters', getDemoChapters());
  setData('users', []);
  setData('bookmarks', []);
  setData('reading_history', []);
  setData('comments', []);
  setData('ratings', []);
  setData('genres', GENRES);
  setData('types', TYPES);
  setData('statuses', STATUSES);
  setData('settings', {
    siteName: 'Yamiko',
    siteDescription: 'Читай мангу онлайн бесплатно',
    theme: 'dark',
    itemsPerPage: 20,
    allowRegistration: true,
    maintenanceMode: false,
  });

  localStorage.setItem('yamiko_db_initialized', 'true');
  localStorage.setItem('yamiko_db_version', '1.0');
}

// Demo data
function getDemoManga(): Manga[] {
  const now = new Date().toISOString();
  return [
    {
      id: generateId(),
      slug: 'demon-slayer',
      title: 'Клинок, рассекающий демонов',
      altTitles: ['Demon Slayer', 'Kimetsu no Yaiba'],
      description: 'История о молодом Танджиро, который становится охотником на демонов после того, как его семья была убита, а младшая сестра превращена в демона.',
      cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Завершено',
      year: 2016,
      author: 'Коёхару Готоге',
      artist: 'Коёхару Готоге',
      genres: ['Экшен', 'Фэнтези', 'Приключения', 'Сёнен'],
      views: 15420,
      rating: 9.2,
      ratingCount: 1243,
      chaptersCount: 205,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'solo-leveling',
      title: 'Поднятие уровня в одиночку',
      altTitles: ['Solo Leveling', '나 혼자만 레벨업'],
      description: 'Сун Джин Ву — самый слабый охотник класса Е, который едва сводит концы с концами. Однажды он оказывается в тайном подземелье и получает способность «повышения уровня».',
      cover: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop',
      type: 'Манхва',
      status: 'Завершено',
      year: 2018,
      author: 'Chugong',
      artist: 'Jang Sung-rak',
      genres: ['Экшен', 'Фэнтези', 'Приключения'],
      views: 28350,
      rating: 9.5,
      ratingCount: 2156,
      chaptersCount: 179,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'one-piece',
      title: 'Ван Пис',
      altTitles: ['One Piece', 'ワンピース'],
      description: 'Монки Д. Луффи мечтает найти легендарное сокровище One Piece и стать Королём Пиратов. Вместе со своей командой он отправляется в опасное путешествие по Гранд Лайн.',
      cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Онгоинг',
      year: 1997,
      author: 'Эйитиро Ода',
      artist: 'Эйитиро Ода',
      genres: ['Экшен', 'Комедия', 'Приключения', 'Фэнтези', 'Сёнен'],
      views: 45200,
      rating: 9.8,
      ratingCount: 5420,
      chaptersCount: 1105,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'jujutsu-kaisen',
      title: 'Магическая битва',
      altTitles: ['Jujutsu Kaisen', '呪術廻戦'],
      description: 'Итадори Юджи — обычный школьник с невероятной физической силой. После того как он проглатывает палец демона Сукуны, его жизнь кардинально меняется.',
      cover: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Завершено',
      year: 2018,
      author: 'Гэгэ Акутами',
      artist: 'Гэгэ Акутами',
      genres: ['Экшен', 'Фэнтези', 'Ужасы', 'Сёнен'],
      views: 22100,
      rating: 9.1,
      ratingCount: 1876,
      chaptersCount: 271,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'attack-on-titan',
      title: 'Атака титанов',
      altTitles: ['Attack on Titan', 'Shingeki no Kyojin', '進撃の巨人'],
      description: 'Человечество оказалось на грани вымирания после появления гигантских существ — Титанов. Выжившие укрылись за огромными стенами и живут в постоянном страхе.',
      cover: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Завершено',
      year: 2009,
      author: 'Хадзимэ Исаяма',
      artist: 'Хадзимэ Исаяма',
      genres: ['Экшен', 'Драма', 'Фэнтези', 'Ужасы', 'Психология'],
      views: 38900,
      rating: 9.4,
      ratingCount: 3210,
      chaptersCount: 139,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'chainsaw-man',
      title: 'Человек-бензопила',
      altTitles: ['Chainsaw Man', 'チェンソーマン'],
      description: 'Дэндзи — молодой парень, живущий в нищете и работающий охотником на демонов, чтобы выплатить долги отца якудза. После смерти он сливается с демоном-бензопилой Почитой.',
      cover: 'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Онгоинг',
      year: 2018,
      author: 'Тацуки Фудзимото',
      artist: 'Тацуки Фудзимото',
      genres: ['Экшен', 'Ужасы', 'Комедия', 'Сёнен'],
      views: 19800,
      rating: 9.0,
      ratingCount: 1654,
      chaptersCount: 156,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'spy-x-family',
      title: 'Семья шпиона',
      altTitles: ['Spy x Family', 'SPY×FAMILY'],
      description: 'Шпион под кодовым именем «Сумерки» должен создать фальшивую семью для выполнения миссии. Он не знает, что его приёмная дочь — телепат, а жена — убийца.',
      cover: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=600&fit=crop',
      type: 'Манга',
      status: 'Онгоинг',
      year: 2019,
      author: 'Тацуя Эндо',
      artist: 'Тацуя Эндо',
      genres: ['Комедия', 'Экшен', 'Романтика', 'Сёнен'],
      views: 16700,
      rating: 9.3,
      ratingCount: 1423,
      chaptersCount: 98,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      slug: 'tower-of-god',
      title: 'Башня Бога',
      altTitles: ['Tower of God', '신의 탑'],
      description: 'Бам провёл всю жизнь в тёмной пещере, пока не встретил девочку по имени Рахиль. Когда она уходит, чтобы подняться на Башню Бога, Бам следует за ней.',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
      type: 'Манхва',
      status: 'Онгоинг',
      year: 2010,
      author: 'SIU',
      artist: 'SIU',
      genres: ['Экшен', 'Фэнтези', 'Приключения', 'Драма'],
      views: 21300,
      rating: 9.1,
      ratingCount: 1876,
      chaptersCount: 580,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function getDemoChapters(): Chapter[] {
  const mangas = getDemoManga();
  const chapters: Chapter[] = [];
  
  // Add some demo chapters for each manga
  mangas.forEach((manga, index) => {
    const chapterCount = Math.min(5, manga.chaptersCount);
    for (let i = 1; i <= chapterCount; i++) {
      chapters.push({
        id: generateId(),
        mangaId: manga.id,
        number: i,
        volume: Math.ceil(i / 10),
        title: i === 1 ? 'Начало' : '',
        pages: [
          'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
          'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
          'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800',
        ],
        translator: 'Yamiko Scans',
        views: Math.floor(Math.random() * 1000) + 100,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
  });
  
  return chapters;
}

// Initialize on import
initDatabase();

// ============================================
// MANGA OPERATIONS
// ============================================

export function getAllManga(): Manga[] {
  return getData<Manga[]>('mangas') || [];
}

export function getMangaById(id: string): Manga | null {
  const mangas = getAllManga();
  return mangas.find(m => m.id === id) || null;
}

export function getMangaBySlug(slug: string): Manga | null {
  const mangas = getAllManga();
  return mangas.find(m => m.slug === slug) || null;
}

export function searchManga(query: string): Manga[] {
  if (!query || query.length < 2) return [];
  
  const mangas = getAllManga();
  const lowerQuery = query.toLowerCase();
  
  return mangas.filter(m => {
    return m.title.toLowerCase().includes(lowerQuery) ||
           m.altTitles.some(t => t.toLowerCase().includes(lowerQuery)) ||
           m.author.toLowerCase().includes(lowerQuery) ||
           m.artist.toLowerCase().includes(lowerQuery) ||
           m.description.toLowerCase().includes(lowerQuery);
  });
}

export function filterManga(filters: FilterOptions = {}): Manga[] {
  let mangas = getAllManga();
  
  if (filters.search) {
    const lowerSearch = filters.search.toLowerCase();
    mangas = mangas.filter(m =>
      m.title.toLowerCase().includes(lowerSearch) ||
      m.altTitles.some(t => t.toLowerCase().includes(lowerSearch))
    );
  }
  
  if (filters.type) {
    mangas = mangas.filter(m => m.type === filters.type);
  }
  
  if (filters.status) {
    mangas = mangas.filter(m => m.status === filters.status);
  }
  
  if (filters.year) {
    mangas = mangas.filter(m => m.year === filters.year);
  }
  
  if (filters.genres && filters.genres.length > 0) {
    mangas = mangas.filter(m =>
      filters.genres!.every(g => m.genres.includes(g))
    );
  }
  
  if (filters.minRating) {
    mangas = mangas.filter(m => m.rating >= filters.minRating!);
  }
  
  if (filters.hasChapters) {
    mangas = mangas.filter(m => m.chaptersCount > 0);
  }
  
  // Sorting
  switch (filters.sort) {
    case 'rating':
      mangas.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
    case 'views':
      mangas.sort((a, b) => b.views - a.views);
      break;
    case 'updated':
      mangas.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      break;
    case 'new':
    case 'created':
      mangas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'title':
    case 'alphabetical':
      mangas.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
      break;
    case 'chapters':
      mangas.sort((a, b) => b.chaptersCount - a.chaptersCount);
      break;
    default:
      mangas.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }
  
  return mangas;
}

export function getPopularManga(limit = 10): Manga[] {
  return filterManga({ sort: 'popular' }).slice(0, limit);
}

export function getRecentlyUpdated(limit = 10): Manga[] {
  return filterManga({ sort: 'updated' }).slice(0, limit);
}

export function getTopRated(limit = 10): Manga[] {
  return filterManga({ sort: 'rating', minRating: 1 }).slice(0, limit);
}

// ============================================
// CHAPTER OPERATIONS
// ============================================

export function getAllChapters(): Chapter[] {
  return getData<Chapter[]>('chapters') || [];
}

export function getChaptersByMangaId(mangaId: string): Chapter[] {
  const chapters = getAllChapters();
  return chapters
    .filter(c => c.mangaId === mangaId)
    .sort((a, b) => a.number - b.number);
}

export function getChapterById(id: string): Chapter | null {
  const chapters = getAllChapters();
  return chapters.find(c => c.id === id) || null;
}

export function getNextChapter(mangaId: string, currentNumber: number): Chapter | null {
  const chapters = getChaptersByMangaId(mangaId);
  return chapters.find(c => c.number > currentNumber) || null;
}

export function getPrevChapter(mangaId: string, currentNumber: number): Chapter | null {
  const chapters = getChaptersByMangaId(mangaId);
  const prev = chapters.filter(c => c.number < currentNumber);
  return prev.length > 0 ? prev[prev.length - 1] : null;
}

export function getFirstChapter(mangaId: string): Chapter | null {
  const chapters = getChaptersByMangaId(mangaId);
  return chapters.length > 0 ? chapters[0] : null;
}

export function getLastChapter(mangaId: string): Chapter | null {
  const chapters = getChaptersByMangaId(mangaId);
  return chapters.length > 0 ? chapters[chapters.length - 1] : null;
}

// ============================================
// UTILITY EXPORTS
// ============================================

export function getGenres(): string[] {
  return getData<string[]>('genres') || GENRES;
}

export function getTypes(): string[] {
  return getData<string[]>('types') || TYPES;
}

export function getStatuses(): string[] {
  return getData<string[]>('statuses') || STATUSES;
}

export { getStorageInfo, generateId, generateSlug };

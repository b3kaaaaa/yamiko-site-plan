// Quest types and data
export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: {
    type: 'energy' | 'coins' | 'exp';
    amount: number;
  };
  deadline: string;
  completed: boolean;
}

export interface UserRating {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  level: number;
  exp: number;
  coins: number;
  guild?: string;
}

export interface Guild {
  id: string;
  name: string;
  tag: string;
  avatar: string;
  level: number;
  members: number;
  maxMembers: number;
  description: string;
  rank: number;
}

// Mock quests data
export const mockQuests: Quest[] = [
  {
    id: "quest-1",
    title: "Войти на сайт",
    description: "Авторизуйтесь на сайте",
    progress: 1,
    maxProgress: 1,
    reward: { type: 'energy', amount: 5 },
    deadline: "24ч",
    completed: true,
  },
  {
    id: "quest-2",
    title: "Прочитать 5 глав",
    description: "Прочитайте любые 5 глав манги",
    progress: 3,
    maxProgress: 5,
    reward: { type: 'coins', amount: 50 },
    deadline: "24ч",
    completed: false,
  },
  {
    id: "quest-3",
    title: "Добавить в закладки",
    description: "Добавьте любую мангу в закладки",
    progress: 0,
    maxProgress: 1,
    reward: { type: 'exp', amount: 100 },
    deadline: "24ч",
    completed: false,
  },
  {
    id: "quest-4",
    title: "Оставить комментарий",
    description: "Напишите комментарий под любой главой",
    progress: 0,
    maxProgress: 1,
    reward: { type: 'coins', amount: 25 },
    deadline: "48ч",
    completed: false,
  },
];

// Mock users for ratings
export const mockUsers: UserRating[] = Array.from({ length: 15 }, (_, i) => ({
  id: `user-${i + 1}`,
  rank: i + 1,
  username: `Reader${String(i + 1).padStart(3, '0')}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  level: Math.floor(Math.random() * 50) + 1,
  exp: Math.floor(Math.random() * 10000),
  coins: Math.floor(Math.random() * 5000),
  guild: i < 10 ? ['ALPHA', 'BETA', 'OMEGA', 'DELTA'][i % 4] : undefined,
}));

// Mock guilds
export const mockGuilds: Guild[] = [
  {
    id: "guild-1",
    name: "Alpha Readers",
    tag: "ALPHA",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alpha",
    level: 15,
    members: 45,
    maxMembers: 50,
    description: "Лучшая гильдия читателей манги",
    rank: 1,
  },
  {
    id: "guild-2",
    name: "Beta Squad",
    tag: "BETA",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=beta",
    level: 12,
    members: 38,
    maxMembers: 50,
    description: "Мы читаем быстрее всех",
    rank: 2,
  },
  {
    id: "guild-3",
    name: "Omega Force",
    tag: "OMEGA",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=omega",
    level: 10,
    members: 42,
    maxMembers: 50,
    description: "Качество важнее количества",
    rank: 3,
  },
  {
    id: "guild-4",
    name: "Delta Team",
    tag: "DELTA",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=delta",
    level: 8,
    members: 29,
    maxMembers: 50,
    description: "Новички приветствуются!",
    rank: 4,
  },
  {
    id: "guild-5",
    name: "Sigma Elite",
    tag: "SIGMA",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=sigma",
    level: 7,
    members: 22,
    maxMembers: 50,
    description: "Элитная группа",
    rank: 5,
  },
];

// Current user mock data
export const currentUser = {
  id: "current-user",
  username: "YamikoFan",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yamiko",
  level: 5,
  exp: 235,
  maxExp: 500,
  energy: 12,
  coins: 235,
  guild: "ALPHA",
  notifications: 3,
  bookmarks: 5,
};

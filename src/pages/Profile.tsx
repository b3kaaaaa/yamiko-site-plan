import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, MessageCircle, Trophy, Bookmark, Zap, Coins,
  Users, LogOut, Clock
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { currentUser, mockGuilds } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

type ProfileTab = "profile" | "bookmarks" | "inventory" | "reviews" | "comments" | "achievements";

const mockBookmarks = [
  {
    id: "1",
    title: "Solo Leveling",
    cover: "https://images.weserv.nl/?url=via.placeholder.com/200x300/1a1a2e/00d4ff?text=Solo+Leveling",
    chapters: 189,
    lastRead: "Chapter 180"
  },
  {
    id: "2",
    title: "The Beginning After The End",
    cover: "https://images.weserv.nl/?url=via.placeholder.com/200x300/1a1a2e/ff006e?text=Beginning",
    chapters: 145,
    lastRead: "Chapter 120"
  },
  {
    id: "3",
    title: "Omniscient Reader",
    cover: "https://images.weserv.nl/?url=via.placeholder.com/200x300/1a1a2e/ffbe0b?text=Omniscient",
    chapters: 200,
    lastRead: "Chapter 195"
  },
];

const mockReviews = [
  {
    id: "1",
    title: "Solo Leveling",
    rating: 5,
    text: "An absolute masterpiece! The story progression is amazing.",
    date: "2024-09-15",
    helpful: 234
  },
  {
    id: "2",
    title: "The Beginning After The End",
    rating: 4,
    text: "Great character development and world-building.",
    date: "2024-09-10",
    helpful: 89
  },
];

const mockAchievements = [
  {
    id: "1",
    title: "First Steps",
    description: "Read your first chapter",
    icon: "📖",
    unlocked: true,
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "Bookworm",
    description: "Add 10 manga to bookmarks",
    icon: "🔖",
    unlocked: true,
    date: "2024-03-20"
  },
  {
    id: "3",
    title: "Reviewer",
    description: "Write 5 reviews",
    icon: "⭐",
    unlocked: true,
    date: "2024-06-10"
  },
  {
    id: "4",
    title: "Guild Master",
    description: "Join a guild",
    icon: "🛡️",
    unlocked: false
  },
  {
    id: "5",
    title: "Marathon Runner",
    description: "Read 1000 chapters",
    icon: "🏃",
    unlocked: false
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Профиль", icon: "👤" },
    { id: "bookmarks", label: "Закладки", icon: "🔖" },
    { id: "inventory", label: "Инвентарь", icon: "💼" },
    { id: "reviews", label: "Отзывы", icon: "⭐" },
    { id: "comments", label: "Комменты", icon: "💬" },
    { id: "achievements", label: "Ачивки", icon: "🏆" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container flex-1 py-8">
        {/* Profile Header */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-32 h-32 rounded-full border-2 border-primary shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{currentUser.username}</h1>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                  LVL {currentUser.level}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">Was online 10 minutes ago</p>
              
              {currentUser.guild && (
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Гильдия: <span className="font-semibold text-primary">{currentUser.guild}</span></span>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">EXP</div>
                  <div className="font-bold">{formatNumber(currentUser.exp)} / {formatNumber(currentUser.maxExp)}</div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">Монеты</div>
                  <div className="font-bold flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    {formatNumber(currentUser.coins)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">Энергия</div>
                  <div className="font-bold flex items-center gap-1">
                    <Zap className="h-4 w-4 text-blue-500" />
                    {currentUser.energy}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">Закладки</div>
                  <div className="font-bold flex items-center gap-1">
                    <Bookmark className="h-4 w-4 text-red-500" />
                    {currentUser.bookmarks}
                  </div>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-4 w-4" />
                Выход
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-secondary/30 border border-border">
                <h2 className="text-lg font-semibold mb-4">Информация профиля</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Имя пользователя</label>
                    <p className="font-medium">{currentUser.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Уровень</label>
                    <p className="font-medium">Уровень {currentUser.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Гильдия</label>
                    <p className="font-medium">{currentUser.guild || "Не присоединена"}</p>
                  </div>
                </div>
              </div>

              {currentUser.guild && (
                <div className="p-6 rounded-lg bg-secondary/30 border border-border">
                  <h2 className="text-lg font-semibold mb-4">Членство в гильдии</h2>
                  {mockGuilds.slice(0, 1).map((guild) => (
                    <div key={guild.id} className="flex items-center gap-4">
                      <img
                        src={guild.avatar}
                        alt={guild.name}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{guild.name}</h3>
                        <p className="text-sm text-muted-foreground">{guild.description}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span>Уровень: <span className="font-semibold">{guild.level}</span></span>
                          <span>Участников: <span className="font-semibold">{guild.members}/{guild.maxMembers}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">{mockBookmarks.length} закладок</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="group rounded-lg overflow-hidden bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                      <img
                        src={bookmark.cover}
                        alt={bookmark.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{bookmark.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{bookmark.chapters} глав</p>
                      <p className="text-xs text-primary mb-3">Читаю: {bookmark.lastRead}</p>
                      <Link
                        to={`/manga/${bookmark.id}`}
                        className="text-sm px-3 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                      >
                        Открыть
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="p-6 rounded-lg bg-secondary/30 border border-border">
              <h2 className="text-lg font-semibold mb-4">Инвентарь</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <div className="text-3xl mb-2">💎</div>
                  <div className="font-semibold">x{formatNumber(currentUser.coins)}</div>
                  <div className="text-xs text-muted-foreground">Монеты</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-semibold">x{currentUser.energy}</div>
                  <div className="text-xs text-muted-foreground">Энергия</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <div className="text-3xl mb-2">🔑</div>
                  <div className="font-semibold">x3</div>
                  <div className="text-xs text-muted-foreground">Ключи</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <div className="font-semibold">x2</div>
                  <div className="text-xs text-muted-foreground">Подарки</div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">{mockReviews.length} отзывов</h2>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{review.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < review.rating ? "text-yellow-500" : "text-muted-foreground"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{review.text}</p>
                    <div className="flex items-center gap-4">
                      <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        Полезно ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="p-6 rounded-lg bg-secondary/30 border border-border text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Здесь будут ваши комментарии</p>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Ачивки ({mockAchievements.filter(a => a.unlocked).length}/{mockAchievements.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all text-center ${
                      achievement.unlocked
                        ? "bg-primary/10 border-primary/50"
                        : "bg-secondary/30 border-border opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-primary mt-2 flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        {achievement.date}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

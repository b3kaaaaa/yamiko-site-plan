import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserRatingCard, GuildCard } from "@/components/RatingCard";
import { mockUsers, mockGuilds } from "@/lib/mockData";
import { getPopularManga } from "@/lib/database";
import { useState } from "react";
import { Users, Shield, BookOpen, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

type RatingTab = 'users' | 'guilds' | 'projects';

const Ratings = () => {
  const [activeTab, setActiveTab] = useState<RatingTab>('users');
  const topProjects = getPopularManga(10);

  const tabs: { value: RatingTab; label: string; icon: typeof Users }[] = [
    { value: 'users', label: 'Читатели', icon: Users },
    { value: 'guilds', label: 'Гильдии', icon: Shield },
    { value: 'projects', label: 'Проекты', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container flex-1 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Рейтинги</h1>
            <p className="text-sm text-muted-foreground">Топ читателей, гильдий и проектов</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUsers.map((user) => (
              <UserRatingCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {activeTab === 'guilds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGuilds.map((guild) => (
              <GuildCard key={guild.id} guild={guild} />
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-3">
            {topProjects.map((manga, index) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 transition-colors"
              >
                <span className={`text-xl font-bold w-8 text-center ${
                  index === 0 ? "text-yellow-400" :
                  index === 1 ? "text-gray-300" :
                  index === 2 ? "text-amber-600" :
                  "text-muted-foreground"
                }`}>
                  {index + 1}
                </span>
                <img 
                  src={manga.cover} 
                  alt={manga.title}
                  className="w-14 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{manga.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {manga.type} • {manga.chaptersCount} глав
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{manga.views.toLocaleString()} просмотров</span>
                    <span>★ {manga.rating.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Ratings;

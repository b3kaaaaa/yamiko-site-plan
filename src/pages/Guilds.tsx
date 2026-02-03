import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuildCard } from "@/components/RatingCard";
import { mockGuilds } from "@/lib/mockData";
import { Shield, Users, Plus, Search } from "lucide-react";
import { useState } from "react";

const Guilds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredGuilds = mockGuilds.filter(guild =>
    guild.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guild.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container flex-1 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Гильдии</h1>
              <p className="text-sm text-muted-foreground">Сообщества читателей</p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Создать гильдию
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск гильдий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full max-w-md rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Shield className="h-5 w-5 text-purple-500 mx-auto mb-2" />
            <p className="text-lg font-bold">{mockGuilds.length}</p>
            <p className="text-xs text-muted-foreground">Всего гильдий</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold">{mockGuilds.reduce((acc, g) => acc + g.members, 0)}</p>
            <p className="text-xs text-muted-foreground">Участников</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Shield className="h-5 w-5 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-bold">3</p>
            <p className="text-xs text-muted-foreground">Открыто набор</p>
          </div>
          <div className="p-4 rounded-xl bg-card/30 border border-border/30 text-center">
            <Users className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
            <p className="text-lg font-bold">50</p>
            <p className="text-xs text-muted-foreground">Макс. участников</p>
          </div>
        </div>

        {/* Guilds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuilds.map((guild) => (
            <GuildCard key={guild.id} guild={guild} />
          ))}
        </div>

        {filteredGuilds.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Гильдии не найдены</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Guilds;

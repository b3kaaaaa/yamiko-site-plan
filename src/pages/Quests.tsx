import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuestCard } from "@/components/QuestCard";
import { mockQuests } from "@/lib/mockData";
import { Trophy, Zap, Target } from "lucide-react";

const Quests = () => {
  const dailyQuests = mockQuests.filter(q => q.deadline === "24ч");
  const weeklyQuests = mockQuests.filter(q => q.deadline !== "24ч");
  
  const completedCount = mockQuests.filter(q => q.completed).length;
  const totalCount = mockQuests.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container flex-1 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Квесты</h1>
          <p className="text-muted-foreground">
            Выполняй задания и получай награды
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}/{totalCount}</p>
                <p className="text-xs text-muted-foreground">Выполнено сегодня</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">175</p>
                <p className="text-xs text-muted-foreground">Энергии получено</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground">Дней подряд</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quests */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Ежедневные квесты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dailyQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </section>

        {/* Weekly Quests */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Еженедельные квесты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weeklyQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Quests;

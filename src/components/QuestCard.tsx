import { Zap, Coins, TrendingUp, Check } from "lucide-react";
import type { Quest } from "@/lib/mockData";

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const progress = (quest.progress / quest.maxProgress) * 100;
  
  const rewardIcon = {
    energy: <Zap className="h-3.5 w-3.5 text-yellow-400" />,
    coins: <Coins className="h-3.5 w-3.5 text-yellow-400" />,
    exp: <TrendingUp className="h-3.5 w-3.5 text-green-400" />,
  };

  const rewardColor = {
    energy: "text-yellow-400",
    coins: "text-yellow-400",
    exp: "text-green-400",
  };

  return (
    <div className={`relative p-4 rounded-xl border min-w-[250px] transition-colors ${
      quest.completed 
        ? "bg-primary/5 border-primary/30" 
        : "bg-card/50 border-border/50 hover:bg-card/70"
    }`}>
      {quest.completed && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <h4 className="text-sm font-medium pr-8">{quest.title}</h4>
      
      {/* Progress bar */}
      <div className="mt-3 mb-2">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${
              quest.completed ? "bg-primary" : "bg-primary/70"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Награда:</span>
          {rewardIcon[quest.reward.type]}
          <span className={rewardColor[quest.reward.type]}>
            {quest.reward.amount}
          </span>
        </div>
        <span className="text-muted-foreground">
          Дедлайн: {quest.deadline}
        </span>
      </div>
    </div>
  );
}

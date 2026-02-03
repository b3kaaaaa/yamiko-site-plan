import { Link } from "react-router-dom";
import type { UserRating, Guild } from "@/lib/mockData";

interface UserRatingCardProps {
  user: UserRating;
}

export function UserRatingCard({ user }: UserRatingCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 transition-colors">
      <span className={`text-lg font-bold w-6 text-center ${getRankColor(user.rank)}`}>
        {user.rank}
      </span>
      <img 
        src={user.avatar} 
        alt={user.username}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{user.username}</span>
          {user.guild && (
            <span className="text-[10px] px-1 py-0.5 rounded bg-primary/20 text-primary">
              [{user.guild}]
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Level {user.level} • {user.exp.toLocaleString()} exp
        </div>
      </div>
    </div>
  );
}

interface GuildCardProps {
  guild: Guild;
}

export function GuildCard({ guild }: GuildCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <Link
      to={`/guilds/${guild.id}`}
      className="block p-4 rounded-xl bg-card/30 border border-border/30 hover:bg-card/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xl font-bold ${getRankColor(guild.rank)}`}>
          #{guild.rank}
        </span>
        <img 
          src={guild.avatar} 
          alt={guild.name}
          className="w-12 h-12 rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{guild.name}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">
              [{guild.tag}]
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Level {guild.level}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {guild.description}
      </p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Участники: {guild.members}/{guild.maxMembers}
        </span>
        <div className="h-1.5 w-20 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${(guild.members / guild.maxMembers) * 100}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

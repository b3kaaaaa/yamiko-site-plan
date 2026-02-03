import { Link } from "react-router-dom";
import { 
  Bookmark, 
  Bell, 
  History, 
  MessageSquare, 
  ArrowLeftRight, 
  CreditCard, 
  Store, 
  MessageCircle, 
  Settings, 
  LogOut,
  Zap,
  Coins,
  X,
  TrendingUp
} from "lucide-react";
import { currentUser } from "@/lib/mockData";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ isOpen, onClose }: UserMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: Bookmark, label: "Закладки", href: "/bookmarks", highlight: true },
    { icon: Bell, label: "Уведомления", href: "/notifications", badge: currentUser.notifications },
    { icon: History, label: "История", href: "/history" },
    { icon: MessageSquare, label: "Сообщения", href: "/messages" },
    { icon: ArrowLeftRight, label: "Обмен", href: "/trade" },
    { icon: CreditCard, label: "Карточки", href: "/cards" },
    { divider: true },
    { icon: Store, label: "Магазин", href: "/store", highlight: true },
    { icon: MessageCircle, label: "Обратная связь", href: "/feedback" },
    { divider: true },
    { icon: Settings, label: "Настройки", href: "/settings" },
    { icon: LogOut, label: "Выйти", href: "/logout", danger: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-72 bg-card border-l border-border z-50 overflow-y-auto animate-in slide-in-from-right">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* User Profile Section */}
        <Link to="/profile" onClick={onClose} className="block p-4 border-b border-border hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username}
              className="w-12 h-12 rounded-full border-2 border-primary"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{currentUser.username}</span>
                {currentUser.guild && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                    [{currentUser.guild}]
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Exp.</span>
                <span className="text-primary">{currentUser.exp}/{currentUser.maxExp}</span>
                <TrendingUp className="h-3 w-3 text-green-400" />
              </div>
            </div>
            <span className="ml-auto text-xs px-2 py-1 rounded bg-primary text-primary-foreground font-medium">
              LV{currentUser.level}
            </span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-muted-foreground">{currentUser.coins}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span className="text-muted-foreground">{currentUser.energy}</span>
            </div>
            <button className="ml-auto w-7 h-7 rounded-full border border-dashed border-primary/50 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="p-2">
          {menuItems.map((item, index) => {
            if ('divider' in item && item.divider) {
              return <div key={index} className="my-2 border-t border-border" />;
            }
            
            const Icon = item.icon!;
            return (
              <Link
                key={index}
                to={item.href!}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.highlight 
                    ? "bg-primary/10 text-primary hover:bg-primary/20" 
                    : item.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

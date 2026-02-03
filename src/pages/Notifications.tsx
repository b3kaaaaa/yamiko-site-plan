import { useState } from "react";
import {
  BookOpen, Users, MapPin, MessageCircle, Zap, Check, X, ChevronDown
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type NotificationType = "all" | "manga" | "guild" | "cards" | "comments" | "news";

interface Notification {
  id: string;
  type: "manga_chapter" | "guild_app" | "comment" | "news" | "card" | "other";
  title: string;
  message: string;
  icon: React.ReactNode;
  read: boolean;
  date: string;
  image?: string;
  action?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "manga_chapter",
    title: "MANGA CHAPTER",
    message: "I became the mad dog's daughter-in-law.",
    icon: <BookOpen className="h-6 w-6" />,
    read: true,
    date: "2024-09-10",
    image: "https://images.weserv.nl/?url=via.placeholder.com/50x50/1a1a2e/ff006e?text=Manga"
  },
  {
    id: "2",
    type: "manga_chapter",
    title: "NEW CHAPTER",
    message: "New chapter 132",
    icon: <BookOpen className="h-6 w-6" />,
    read: false,
    date: "2024-09-10",
    action: "Chapter 132"
  },
  {
    id: "3",
    type: "manga_chapter",
    title: "NEW CHAPTER",
    message: "New chapter 131",
    icon: <BookOpen className="h-6 w-6" />,
    read: false,
    date: "2024-09-10",
    action: "Chapter 131"
  },
  {
    id: "4",
    type: "manga_chapter",
    title: "NEW CHAPTER",
    message: "New chapter 129",
    icon: <BookOpen className="h-6 w-6" />,
    read: false,
    date: "2024-09-10",
    action: "Chapter 129"
  },
  {
    id: "5",
    type: "guild_app",
    title: "GUILD APPLICATION",
    message: "Arya wants to join guild Dominos",
    icon: <Users className="h-6 w-6" />,
    read: false,
    date: "2024-09-10"
  },
  {
    id: "6",
    type: "comment",
    title: "COMMENT REPLY",
    message: 'User Arya replied to you: "@b3ka fuck you"',
    icon: <MessageCircle className="h-6 w-6" />,
    read: false,
    date: "2024-09-10"
  },
  {
    id: "7",
    type: "news",
    title: "NEWS",
    message: "Added a new profile feature for customization!",
    icon: <Zap className="h-6 w-6" />,
    read: false,
    date: "2024-09-10",
    action: "More details"
  },
  {
    id: "8",
    type: "card",
    title: "NEW CARD",
    message: "Congratulations! You unlocked a new rank X card.",
    icon: <MapPin className="h-6 w-6" />,
    read: false,
    date: "2024-09-10"
  },
];

const getNotificationColor = (type: string): string => {
  switch (type) {
    case "manga_chapter":
      return "text-blue-500";
    case "guild_app":
      return "text-purple-500";
    case "comment":
      return "text-pink-500";
    case "news":
      return "text-yellow-500";
    case "card":
      return "text-emerald-500";
    default:
      return "text-primary";
  }
};

const getNotificationBg = (type: string): string => {
  switch (type) {
    case "manga_chapter":
      return "bg-blue-500/10";
    case "guild_app":
      return "bg-purple-500/10";
    case "comment":
      return "bg-pink-500/10";
    case "news":
      return "bg-yellow-500/10";
    case "card":
      return "bg-emerald-500/10";
    default:
      return "bg-primary/10";
  }
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const tabs: { id: NotificationType; label: string }[] = [
    { id: "all", label: "EVERYTHING" },
    { id: "manga", label: "MANGA" },
    { id: "guild", label: "GUILD" },
    { id: "cards", label: "CARDS" },
    { id: "comments", label: "COMMENTS" },
    { id: "news", label: "NEWS" },
  ];

  const filterNotifications = (): Notification[] => {
    let filtered = notifications;

    if (activeTab !== "all") {
      filtered = filtered.filter((n) => {
        switch (activeTab) {
          case "manga":
            return n.type === "manga_chapter";
          case "guild":
            return n.type === "guild_app";
          case "cards":
            return n.type === "card";
          case "comments":
            return n.type === "comment";
          case "news":
            return n.type === "news";
          default:
            return true;
        }
      });
    }

    if (sortBy === "oldest") {
      return filtered.reverse();
    }
    return filtered;
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filterNotifications();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="container flex-1 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Check className="h-4 w-4" />
                Mark all as read
              </button>
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
                  <span>NOT READEN</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-w-2xl">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`group p-4 rounded-lg border transition-all cursor-pointer ${
                  notification.read
                    ? "bg-secondary/20 border-border hover:bg-secondary/30"
                    : "bg-secondary/40 border-primary/50 hover:bg-secondary/50"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon/Image */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getNotificationBg(
                      notification.type
                    )}`}
                  >
                    <div className={getNotificationColor(notification.type)}>
                      {notification.image ? (
                        <img
                          src={notification.image}
                          alt="notification"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        notification.icon
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-primary">
                          {notification.title}
                        </h3>
                        <p className="text-foreground mt-1">{notification.message}</p>
                        {notification.action && (
                          <a
                            href="#"
                            className="text-primary text-sm hover:underline mt-1 inline-block"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {notification.action}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date and Status */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.date}
                    </span>
                    {notification.read && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-3">
                <MessageCircle className="h-12 w-12 mx-auto opacity-50 mb-3" />
                <p>No notifications</p>
              </div>
            </div>
          )}

          {/* View all button */}
          {activeTab !== "all" && filteredNotifications.length > 0 && (
            <button className="w-full text-center py-3 text-primary hover:text-primary/80 font-medium transition-colors">
              View all
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

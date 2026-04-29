import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Trophy, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: BookOpen, label: "Aprender", path: "/learning-path" },
  { icon: Trophy, label: "Ranking", path: "/leaderboard" },
  { icon: User, label: "Perfil", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors
                ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

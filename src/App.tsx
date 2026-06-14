import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Opening from "./pages/Opening";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Exercises from "./pages/Exercises";
import History from "./pages/History";
import Home from "./pages/Home";
import LearningPath from "./pages/LearningPath";
import ModuleMap from "./pages/ModuleMap";
import Lesson from "./pages/Lesson";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Opening />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/history" element={<History />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/module/:moduleId" element={<ModuleMap />} />
          <Route path="/lesson/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

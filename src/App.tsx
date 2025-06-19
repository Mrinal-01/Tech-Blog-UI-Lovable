
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import ProfilePage from "./components/ProfilePage";
import NewBlogPage from "./components/NewBlogPage";
import BlogEditPage from "./components/BlogEditPage";
import FollowingsPage from "./components/FollowingsPage";
import HistoryPage from "./components/HistoryPage";
import SavedBlogsPage from "./components/SavedBlogsPage";
import BookmarksPage from "./components/BookmarksPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/new-blog" element={<NewBlogPage />} />
            <Route path="/edit-blog/:id" element={<BlogEditPage />} />
            <Route path="/followings" element={<FollowingsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/saved-blogs" element={<SavedBlogsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

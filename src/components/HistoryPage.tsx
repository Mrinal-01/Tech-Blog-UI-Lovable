
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { History, Search, Eye, Heart, Clock, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface HistoryItem {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  readAt: string;
  readTime: number;
  likes: number;
  views: number;
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic...",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      author: "Alice Johnson",
      readAt: "2024-01-15T10:30:00Z",
      readTime: 8,
      likes: 245,
      views: 3200
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      excerpt: "Explore advanced TypeScript patterns that can make your code more robust and maintainable...",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      author: "Bob Smith",
      readAt: "2024-01-14T15:45:00Z",
      readTime: 12,
      likes: 189,
      views: 2800
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "A comprehensive guide to understanding when to use CSS Grid versus Flexbox for your layouts...",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      author: "Carol Davis",
      readAt: "2024-01-13T09:15:00Z",
      readTime: 6,
      likes: 156,
      views: 2100
    }
  ]);

  const handleRemoveFromHistory = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAllHistory = () => {
    setHistory([]);
  };

  const formatReadTime = (date: string) => {
    const now = new Date();
    const readDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - readDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <History className="w-8 h-8 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-900">Reading History</h1>
            </div>
          </div>
          
          {history.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearAllHistory}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search your reading history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {item.author}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatReadTime(item.readAt)}</span>
                          </span>
                          <span>{item.readTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views}</span>
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromHistory(item.id);
                        }}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && history.length > 0 && (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No matching articles
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms.
            </p>
          </div>
        )}

        {history.length === 0 && (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No reading history yet
            </h3>
            <p className="text-gray-500">
              Start reading some articles to build your history!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

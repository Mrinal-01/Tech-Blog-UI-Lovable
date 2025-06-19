
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Eye, Heart, Clock, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface SavedBlog {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  savedAt: string;
  readTime: number;
  likes: number;
  views: number;
  category: string;
}

const SavedBlogsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedBlogs, setSavedBlogs] = useState<SavedBlog[]>([
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt: "Learn best practices for building large-scale React applications that can grow with your team...",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      author: "Sarah Wilson",
      savedAt: "2024-01-10T14:20:00Z",
      readTime: 15,
      likes: 342,
      views: 4500,
      category: "React"
    },
    {
      id: 2,
      title: "Mastering CSS Animations",
      excerpt: "Deep dive into CSS animations and transitions to create smooth, performant web experiences...",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      author: "Mike Chen",
      savedAt: "2024-01-08T11:15:00Z",
      readTime: 10,
      likes: 198,
      views: 2800,
      category: "CSS"
    },
    {
      id: 3,
      title: "Node.js Performance Optimization",
      excerpt: "Techniques and strategies to optimize your Node.js applications for better performance...",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      author: "Alex Johnson",
      savedAt: "2024-01-05T16:30:00Z",
      readTime: 12,
      likes: 267,
      views: 3200,
      category: "Node.js"
    }
  ]);

  const handleRemoveFromSaved = (id: number) => {
    setSavedBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  const formatSavedTime = (date: string) => {
    const now = new Date();
    const savedDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - savedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Saved ${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Saved ${diffInDays} days ago`;
    }
  };

  const filteredBlogs = savedBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Blogs</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search saved blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Saved Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromSaved(blog.id);
                  }}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {blog.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>by {blog.author}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime} min read</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatSavedTime(blog.savedAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && savedBlogs.length > 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No matching blogs
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms.
            </p>
          </div>
        )}

        {savedBlogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No saved blogs yet
            </h3>
            <p className="text-gray-500">
              Start saving blogs you want to read later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBlogsPage;

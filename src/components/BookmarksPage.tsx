
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bookmark, Search, Eye, Heart, Clock, ArrowLeft, Trash2, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

interface BookmarkedBlog {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  bookmarkedAt: string;
  readTime: number;
  likes: number;
  views: number;
  tags: string[];
  url: string;
}

const BookmarksPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<BookmarkedBlog[]>([
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring upcoming trends and technologies that will shape the future of web development...",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      author: "Emma Thompson",
      bookmarkedAt: "2024-01-12T09:30:00Z",
      readTime: 8,
      likes: 456,
      views: 5200,
      tags: ["Web Development", "Future Tech", "Trends"],
      url: "/blog/1"
    },
    {
      id: 2,
      title: "JavaScript ES2024 Features",
      excerpt: "A comprehensive guide to the new features coming in JavaScript ES2024 and how to use them...",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      author: "David Kim",
      bookmarkedAt: "2024-01-09T14:45:00Z",
      readTime: 12,
      likes: 289,
      views: 3800,
      tags: ["JavaScript", "ES2024", "Features"],
      url: "/blog/2"
    },
    {
      id: 3, 
      title: "Database Design Best Practices",
      excerpt: "Learn essential database design principles that will make your applications more efficient...",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
      author: "Rachel Martinez",
      bookmarkedAt: "2024-01-07T11:20:00Z",
      readTime: 15,
      likes: 234,
      views: 2900,
      tags: ["Database", "Design", "Best Practices"],
      url: "/blog/3"
    }
  ]);

  const handleRemoveBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const formatBookmarkTime = (date: string) => {
    const now = new Date();
    const bookmarkDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - bookmarkDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Bookmarked ${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Bookmarked ${diffInDays} days ago`;
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <Bookmark className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Bookmarks List */}
        <div className="space-y-4">
          {filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="relative">
                    <img 
                      src={bookmark.thumbnail} 
                      alt={bookmark.title}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded">
                      <Bookmark className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                          {bookmark.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {bookmark.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {bookmark.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {bookmark.author}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{bookmark.readTime} min read</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{bookmark.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{bookmark.views}</span>
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatBookmarkTime(bookmark.bookmarkedAt)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBookmark(bookmark.id);
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

        {filteredBookmarks.length === 0 && bookmarks.length > 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No matching bookmarks
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms.
            </p>
          </div>
        )}

        {bookmarks.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-500">
              Start bookmarking articles you want to reference later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;

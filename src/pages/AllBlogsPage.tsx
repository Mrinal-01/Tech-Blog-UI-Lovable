
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Clock, User, Search, Filter, Grid, List, ArrowLeft, Calendar, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  category: string;
}

const AllBlogsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedTag, setSelectedTag] = useState("all");

  // Mock data
  const generateMockBlogs = (startIndex: number, count: number): Blog[] => {
    const categories = ["Technology", "Programming", "Design", "AI/ML", "Web Development", "Mobile", "DevOps"];
    const tags = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "CSS", "HTML", "API", "Database", "Frontend", "Backend"];
    
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      title: `Blog Post ${startIndex + i}: Advanced Tips for Modern Development`,
      excerpt: `This is an excerpt for blog post ${startIndex + i}. It provides a brief overview of the content and gives readers a taste of what to expect.`,
      author: `Author ${Math.floor(Math.random() * 10) + 1}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      readTime: `${Math.floor(Math.random() * 15) + 5} min read`,
      thumbnail: "/placeholder.svg",
      likes: Math.floor(Math.random() * 200) + 10,
      comments: Math.floor(Math.random() * 50) + 1,
      views: Math.floor(Math.random() * 1000) + 100,
      tags: tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
      category: categories[Math.floor(Math.random() * categories.length)]
    }));
  };

  // Load initial blogs
  useEffect(() => {
    const initialBlogs = generateMockBlogs(1, 12);
    setBlogs(initialBlogs);
    setFilteredBlogs(initialBlogs);
  }, []);

  // Filter and sort blogs
  useEffect(() => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== "all") {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }

    // Sort
    switch (sortBy) {
      case "latest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "most-liked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "most-viewed":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "most-commented":
        filtered.sort((a, b) => b.comments - a.comments);
        break;
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, sortBy, selectedTag]);

  // Infinite scroll
  const loadMoreBlogs = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newBlogs = generateMockBlogs((page * 12) + 1, 12);
      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs(prev => [...prev, ...newBlogs]);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    }, 1000);
  }, [loading, hasMore, page]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreBlogs();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreBlogs]);

  const toggleLike = (e: React.MouseEvent, blogId: number) => {
    e.stopPropagation();
    const wasLiked = likedPosts.includes(blogId);
    
    if (wasLiked) {
      setLikedPosts(prev => prev.filter(id => id !== blogId));
      setBlogs(prev => prev.map(blog => 
        blog.id === blogId ? { ...blog, likes: blog.likes - 1 } : blog
      ));
    } else {
      setLikedPosts(prev => [...prev, blogId]);
      setBlogs(prev => prev.map(blog => 
        blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    }
  };

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  const categories = ["all", "Technology", "Programming", "Design", "AI/ML", "Web Development", "Mobile", "DevOps"];
  const tags = ["all", "JavaScript", "React", "TypeScript", "Node.js", "Python", "CSS", "HTML", "API", "Database"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              All Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover amazing articles from our community
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tag Filter */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag === "all" ? "All Tags" : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="most-commented">Most Commented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredBlogs.length} blogs found
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Grid/List */}
        <div className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
          : 'space-y-6'
        }`}>
          {filteredBlogs.map((blog) => (
            <Card 
              key={blog.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onClick={() => handleBlogClick(blog.id)}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="aspect-video bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {blog.category}
                      </Badge>
                      {blog.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-3">{blog.author}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="mr-3">{blog.readTime}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => toggleLike(e, blog.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            likedPosts.includes(blog.id)
                              ? 'text-red-500'
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.includes(blog.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{blog.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{blog.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{blog.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex w-full">
                  <div className="w-48 h-32 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex-shrink-0">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {blog.category}
                      </Badge>
                      {blog.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4 mr-1" />
                        <span className="mr-4">{blog.author}</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="mr-4">{blog.readTime}</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => toggleLike(e, blog.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            likedPosts.includes(blog.id)
                              ? 'text-red-500'
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.includes(blog.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{blog.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{blog.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{blog.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* End of results */}
        {!hasMore && filteredBlogs.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No more blogs to load</p>
          </div>
        )}

        {/* No results */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No blogs found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedTag("all");
                setSortBy("latest");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllBlogsPage;

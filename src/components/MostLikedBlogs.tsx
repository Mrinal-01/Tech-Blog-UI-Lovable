import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MostLikedBlogs = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [blogStats, setBlogStats] = useState({
    1: { likes: 127, comments: 23 },
    2: { likes: 89, comments: 15 },
    3: { likes: 156, comments: 31 }
  });
  const { toast } = useToast();

  const blogs = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Web Development",
      excerpt: "Exploring how AI is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
      author: "Alex Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      excerpt: "Best practices and architectural patterns for creating React applications that can grow with your business needs.",
      author: "Sarah Chen",
      date: "2024-01-12",
      readTime: "12 min read",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "The Complete Guide to TypeScript",
      excerpt: "From basic types to advanced generics, learn everything you need to know about TypeScript development.",
      author: "Mike Rodriguez",
      date: "2024-01-10",
      readTime: "15 min read",
      thumbnail: "/placeholder.svg"
    }
  ];

  const toggleLike = (e: React.MouseEvent, blogId: number) => {
    e.stopPropagation();
    const wasLiked = likedPosts.includes(blogId);
    
    if (wasLiked) {
      setLikedPosts(prev => prev.filter(id => id !== blogId));
      setBlogStats(prev => ({
        ...prev,
        [blogId]: {
          ...prev[blogId as keyof typeof prev],
          likes: prev[blogId as keyof typeof prev].likes - 1
        }
      }));
      toast({
        title: "Like removed",
        description: "You unliked this blog post.",
      });
    } else {
      setLikedPosts(prev => [...prev, blogId]);
      setBlogStats(prev => ({
        ...prev,
        [blogId]: {
          ...prev[blogId as keyof typeof prev],
          likes: prev[blogId as keyof typeof prev].likes + 1
        }
      }));
      toast({
        title: "Blog liked!",
        description: "Thanks for liking this post!",
      });
    }
  };

  const handleCommentClick = (e: React.MouseEvent, blogId: number) => {
    e.stopPropagation();
    navigate(`/blog/${blogId}#comments`);
  };

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  const handleViewAll = () => {
    navigate('/all-blogs');
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Most Liked Blogs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover the most popular articles from our community of developers and tech enthusiasts
            </p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleViewAll}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer transform hover:scale-105"
              onClick={() => handleBlogClick(blog.id)}
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Author and Meta */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blog.author}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{blog.readTime}</span>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => toggleLike(e, blog.id)}
                      className={`flex items-center space-x-1 transition-colors hover:scale-110 transform ${
                        likedPosts.includes(blog.id)
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
                      }`}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          likedPosts.includes(blog.id) ? 'fill-current' : ''
                        }`} 
                      />
                      <span className="text-sm">{blogStats[blog.id as keyof typeof blogStats].likes}</span>
                    </button>
                    <button
                      onClick={(e) => handleCommentClick(e, blog.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:scale-110 transform"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{blogStats[blog.id as keyof typeof blogStats].comments}</span>
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostLikedBlogs;

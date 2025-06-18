
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Redux Toolkit",
    author: "John Doe",
    date: "2 days ago",
    image: "/placeholder.svg?height=200&width=300",
    category: "React.js",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Advanced TypeScript/OOP Techniques for Modern Development",
    author: "Jane Smith", 
    date: "3 days ago",
    image: "/placeholder.svg?height=200&width=300",
    category: "TypeScript",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Building REST APIs with Node.js and Express Framework",
    author: "Mike Johnson",
    date: "5 days ago", 
    image: "/placeholder.svg?height=200&width=300",
    category: "Node.js",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "TypeScript Best Practices for Large-Scale Applications",
    author: "Sarah Wilson",
    date: "1 week ago",
    image: "/placeholder.svg?height=200&width=300", 
    category: "TypeScript",
    readTime: "7 min read"
  }
];

const MostLikedBlogs = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Most Liked Blogs</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">⚛️</div>
                    <div className="text-sm font-medium">{post.category}</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>👤 {post.author}</span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                </div>
                <div className="text-xs text-gray-400">{post.readTime}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostLikedBlogs;

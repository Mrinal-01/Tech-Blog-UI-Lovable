
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in real app this would come from API
  const blog = {
    id: id,
    title: "The Future of Artificial Intelligence in Web Development",
    content: `
      <p>Artificial Intelligence is revolutionizing the way we approach web development. From automated code generation to intelligent design systems, AI is becoming an integral part of the modern developer's toolkit.</p>
      
      <h2>Key Areas of Impact</h2>
      <p>AI is making significant impacts in several areas of web development:</p>
      
      <h3>1. Code Generation and Completion</h3>
      <p>Modern AI tools can generate entire functions, components, and even full applications based on natural language descriptions. This dramatically speeds up the development process.</p>
      
      <h3>2. Automated Testing</h3>
      <p>AI-powered testing tools can automatically generate test cases, identify edge cases, and predict potential bugs before they occur in production.</p>
      
      <h3>3. Design and User Experience</h3>
      <p>AI can analyze user behavior patterns to suggest optimal layouts, color schemes, and user interface elements that improve engagement and conversion rates.</p>
      
      <h2>Challenges and Considerations</h2>
      <p>While AI brings numerous benefits, developers must also consider challenges such as code quality, security implications, and the need to maintain human oversight in the development process.</p>
      
      <h2>Looking Forward</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated tools that will further streamline the web development process while maintaining high standards of quality and security.</p>
    `,
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      bio: "Senior Full Stack Developer with 8+ years of experience"
    },
    publishedAt: "2024-01-15",
    likes: 127,
    comments: 23,
    tags: ["AI", "Web Development", "Technology", "Future"],
    thumbnail: "/placeholder.svg",
    readTime: "8 min read"
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        {/* Blog Header */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Thumbnail */}
          <div className="aspect-video bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                <Heart className="w-5 h-5" />
                <span>{blog.likes}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                <MessageCircle className="w-5 h-5" />
                <span>{blog.comments}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-green-500">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog.author.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.author.bio}</p>
                  <Button variant="outline" size="sm">
                    Follow Author
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({blog.comments})
              </h3>
              
              {/* Comment Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <textarea
                  placeholder="Write a comment..."
                  className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end mt-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-6">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">User {index + 1}</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-gray-700">
                        Great article! Really insightful perspective on AI in web development.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;

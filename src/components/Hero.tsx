
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const blogThumbnails = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    image: "/lovable-uploads/fab5bbac-401f-4de4-8061-e5cda231c5da.png",
    category: "React"
  },
  {
    id: 2,
    title: "Advanced TypeScript Techniques",
    image: "/lovable-uploads/fab5bbac-401f-4de4-8061-e5cda231c5da.png",
    category: "TypeScript"
  },
  {
    id: 3,
    title: "Node.js Best Practices",
    image: "/lovable-uploads/fab5bbac-401f-4de4-8061-e5cda231c5da.png",
    category: "Node.js"
  },
  {
    id: 4,
    title: "Modern Web Development",
    image: "/lovable-uploads/fab5bbac-401f-4de4-8061-e5cda231c5da.png",
    category: "Web Dev"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogThumbnails.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Learn, Collaborate, Grow
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Join our community of tech enthusiasts and level up your skills.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                View Pricing
              </Button>
            </div>
          </div>
          
          {/* Animated Image Slider */}
          <div className="relative">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {blogThumbnails.map((blog, index) => (
                  <div key={blog.id} className="min-w-full h-full relative">
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center rounded-2xl">
                      <div className="text-center text-white p-8">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                        <span className="bg-white/20 text-sm px-3 py-1 rounded-full">{blog.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Slider indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {blogThumbnails.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating thumbnails animation */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-lg animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-lg animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

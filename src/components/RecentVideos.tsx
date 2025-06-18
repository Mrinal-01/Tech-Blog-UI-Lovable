
import { Video, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const videos = [
  {
    id: 1,
    title: "React Hooks Deep Dive: useEffect Explained",
    author: "Tech Master",
    views: "15K views",
    duration: "12:45",
    thumbnail: "/placeholder.svg?height=200&width=350"
  },
  {
    id: 2,
    title: "Docker for Beginners: Getting Started with Containers",
    author: "DevOps Pro",
    views: "8.2K views", 
    duration: "18:30",
    thumbnail: "/placeholder.svg?height=200&width=350"
  },
  {
    id: 3,
    title: "TailwindCSS: Build Responsive UI in Minutes",
    author: "CSS Ninja",
    views: "22K views",
    duration: "9:15",
    thumbnail: "/placeholder.svg?height=200&width=350"
  }
];

const RecentVideos = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Recent Videos</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Video className="w-12 h-12 text-white opacity-80" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <div className="text-sm text-gray-600 mb-1">{video.author}</div>
                <div className="text-xs text-gray-500">{video.views}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentVideos;

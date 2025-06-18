
import { Search, Login } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">📚 TechBlog</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blogs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Videos</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm"
            />
          </div>
          <Button variant="ghost" className="text-gray-600">
            <Login className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

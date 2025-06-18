
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AuthModal from "./AuthModal";
import NotificationDropdown from "./NotificationDropdown";
import UserProfileDropdown from "./UserProfileDropdown";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("John Doe"); // Demo name

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
    
    // Demo: Set name based on email or use default
    if (email === 'test@example.com') {
      setUserName('Test User');
    } else if (email) {
      setUserName(email.split('@')[0].replace(/[^a-zA-Z]/g, ' '));
    }
  }, []);

  const handleLogin = () => {
    setAuthView('login');
    setIsAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthView('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TechBlog
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Blogs</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
            </nav>

            {/* Search and Auth */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="bg-transparent outline-none text-sm w-40"
                />
              </div>

              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <NotificationDropdown />

                  {/* User Profile Dropdown */}
                  <div className="flex items-center space-x-2">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700">Welcome back!</span>
                      <span className="text-xs text-gray-500">{userName}</span>
                    </div>
                    <UserProfileDropdown 
                      userName={userName}
                      userEmail={userEmail}
                      onLogout={handleLogout}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleLogin}
                    className="text-gray-700 hover:text-purple-600"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={handleSignup}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        initialView={authView}
      />
    </>
  );
};

export default Header;

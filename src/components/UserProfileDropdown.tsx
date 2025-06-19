
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { User, BookOpen, Users, History, Bookmark, Settings, LogOut, Plus } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface UserProfileDropdownProps {
  userName: string;
  userEmail: string;
  userImage?: string;
  onLogout: () => void;
}

const UserProfileDropdown = ({ userName, userEmail, userImage, onLogout }: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (action: string) => {
    console.log(`Clicked: ${action}`);
    setIsOpen(false);
    
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'new-blog':
        navigate('/new-blog');
        break;
      case 'followings':
        navigate('/followings');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'saved':
        navigate('/saved-blogs');
        break;
      case 'bookmarks':
        navigate('/bookmarks');
        break;
      case 'settings':
        console.log('Opening settings');
        // Navigate to settings page when created
        break;
      case 'logout':
        onLogout();
        break;
    }
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'Your Profile', color: 'text-gray-700' },
    { id: 'new-blog', icon: Plus, label: 'New Blog', color: 'text-green-600' },
    { id: 'followings', icon: Users, label: 'Followings', color: 'text-blue-600' },
    { id: 'history', icon: History, label: 'History', color: 'text-orange-600' },
    { id: 'saved', icon: BookOpen, label: 'Saved Blogs', color: 'text-purple-600' },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks', color: 'text-yellow-600' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-600' },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-1 h-auto">
          <UserAvatar 
            name={userName} 
            email={userEmail} 
            imageUrl={userImage}
            size="md"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        {/* User Info Header */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <UserAvatar 
              name={userName} 
              email={userEmail} 
              imageUrl={userImage}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{userName}</p>
              <p className="text-sm text-gray-600 truncate">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <IconComponent className={`w-5 h-5 mr-3 ${item.color}`} />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </button>
            );
          })}
          
          <Separator className="my-2" />
          
          {/* Logout */}
          <button
            onClick={() => handleMenuClick('logout')}
            className="w-full flex items-center px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileDropdown;

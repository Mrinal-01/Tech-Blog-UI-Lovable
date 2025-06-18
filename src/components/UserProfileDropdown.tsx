
import { useState } from "react";
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

  const handleMenuClick = (action: string) => {
    console.log(`Clicked: ${action}`);
    setIsOpen(false);
    
    // Demo API calls - replace with actual endpoints
    switch (action) {
      case 'profile':
        console.log('Opening profile page');
        // Navigate to profile page or open modal
        break;
      case 'new-blog':
        console.log('Opening new blog editor');
        // Navigate to blog creation page
        break;
      case 'followings':
        console.log('Opening followings page');
        // Navigate to followings page
        break;
      case 'history':
        console.log('Opening reading history');
        // Navigate to history page
        break;
      case 'saved':
        console.log('Opening saved blogs');
        // Navigate to saved blogs page
        break;
      case 'bookmarks':
        console.log('Opening bookmarks');
        // Navigate to bookmarks page
        break;
      case 'settings':
        console.log('Opening settings');
        // Navigate to settings page
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

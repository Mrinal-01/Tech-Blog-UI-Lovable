import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
}

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Blog Published',
      message: 'Your blog "React Best Practices" has been published successfully.',
      isRead: false,
      timestamp: '2 hours ago',
      type: 'success'
    },
    {
      id: '2',
      title: 'New Follower',
      message: 'John Doe started following you.',
      isRead: false,
      timestamp: '5 hours ago',
      type: 'info'
    },
    {
      id: '3',
      title: 'Comment on your blog',
      message: 'Someone commented on your blog "JavaScript Tips".',
      isRead: true,
      timestamp: '1 day ago',
      type: 'info'
    }
  ]);

  const { toast } = useToast();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id: string) => {
    try {
      console.log(`Marking notification ${id} as read`);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      console.log('Marking all notifications as read');
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
      toast({
        title: "All notifications marked as read",
        description: "Your notifications have been updated.",
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      console.log('Clearing all notifications');
      setNotifications([]);
      toast({
        title: "All notifications cleared",
        description: "Your notification list has been cleared.",
      });
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs text-purple-600 hover:text-purple-700 px-2 py-1 h-auto"
              >
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllNotifications}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 h-auto"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors",
                  !notification.isRead && "bg-blue-50 border-l-4 border-l-blue-500"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        "font-medium text-sm",
                        !notification.isRead ? "text-gray-900" : "text-gray-600"
                      )}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  {notification.isRead && (
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;

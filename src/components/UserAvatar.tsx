
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  email: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const UserAvatar = ({ name, email, imageUrl, size = "md", className }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getRandomColor = (email: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    
    // Use email to generate consistent color for same user
    const hash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base"
  };

  const initials = getInitials(name);
  const bgColor = getRandomColor(email);

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
      <AvatarFallback className={`${bgColor} text-white font-semibold`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

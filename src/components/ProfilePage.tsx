
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, User, BookOpen, Heart, Eye, Users, TrendingUp, Edit } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface ProfileData {
  name: string;
  email: string;
  username: string;
  bio: string;
  website: string;
  location: string;
  phone: string;
  profileImage?: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  likes: number;
  views: number;
  createdAt: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "test@example.com",
    username: "johndoe",
    bio: "Full-stack developer passionate about React and TypeScript",
    website: "https://johndoe.dev",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    profileImage: ""
  });

  const [userBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      excerpt: "Learn how to set up a React project with TypeScript and best practices for type safety...",
      thumbnail: "/placeholder.svg",
      likes: 45,
      views: 1200,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Advanced State Management in React",
      excerpt: "Exploring different state management solutions for complex React applications...",
      thumbnail: "/placeholder.svg",
      likes: 67,
      views: 2100,
      createdAt: "2024-01-10"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const stats = {
    totalBlogs: userBlogs.length,
    totalLikes: userBlogs.reduce((sum, blog) => sum + blog.likes, 0),
    totalViews: userBlogs.reduce((sum, blog) => sum + blog.views, 0),
    followers: 234,
    following: 89
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      console.log('Updating profile:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
      </div>

      {/* Profile Header with Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <UserAvatar 
                name={profileData.name}
                email={profileData.email}
                imageUrl={profileData.profileImage}
                size="lg"
                className="h-20 w-20"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">@{profileData.username}</p>
              <p className="text-gray-700 mt-2">{profileData.bio}</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalBlogs}</div>
                <div className="text-sm text-gray-600">Blogs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.totalLikes}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="blogs">Your Blogs</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>Edit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <UserAvatar 
                    name={profileData.name}
                    email={profileData.email}
                    imageUrl={profileData.profileImage}
                    size="lg"
                    className="h-20 w-20"
                  />
                  <label 
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profileData.name}</h3>
                  <p className="text-gray-600">@{profileData.username}</p>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="Enter your website URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <Card key={blog.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </span>
                    </div>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-600">{stats.totalBlogs}</div>
                <div className="text-gray-600">Total Blogs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-red-600">{stats.totalLikes}</div>
                <div className="text-gray-600">Total Likes</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600">{stats.totalViews}</div>
                <div className="text-gray-600">Total Views</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600">{stats.followers}</div>
                <div className="text-gray-600">Followers</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Performance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average likes per blog</span>
                  <span className="font-semibold">{Math.round(stats.totalLikes / stats.totalBlogs)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average views per blog</span>
                  <span className="font-semibold">{Math.round(stats.totalViews / stats.totalBlogs)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Engagement rate</span>
                  <span className="font-semibold">{((stats.totalLikes / stats.totalViews) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search, UserPlus, UserMinus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import Header from "./Header";

interface Following {
  id: number;
  name: string;
  email: string;
  username: string;
  bio: string;
  followers: number;
  following: boolean;
  profileImage?: string;
}

const FollowingsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [followings, setFollowings] = useState<Following[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      username: "alice_dev",
      bio: "Frontend developer passionate about React and TypeScript",
      followers: 1250,
      following: true,
      profileImage: ""
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      username: "bob_fullstack",
      bio: "Full-stack developer building scalable web applications",
      followers: 890,
      following: true,
      profileImage: ""
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      username: "carol_design",
      bio: "UI/UX designer and occasional blogger about design trends",
      followers: 2100,
      following: true,
      profileImage: ""
    }
  ]);

  const handleFollowToggle = (id: number) => {
    setFollowings(prev => 
      prev.map(person => 
        person.id === id 
          ? { ...person, following: !person.following }
          : person
      )
    );
  };

  const filteredFollowings = followings.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Following</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search people you follow..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Following List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFollowings.map((person) => (
            <Card key={person.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <UserAvatar 
                    name={person.name}
                    email={person.email}
                    imageUrl={person.profileImage}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {person.name}
                    </h3>
                    <p className="text-purple-600 text-sm">@{person.username}</p>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {person.bio}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        {person.followers} followers
                      </span>
                      <Button
                        onClick={() => handleFollowToggle(person.id)}
                        variant={person.following ? "outline" : "default"}
                        size="sm"
                        className={person.following 
                          ? "text-red-600 border-red-300 hover:bg-red-50" 
                          : "bg-purple-600 hover:bg-purple-700"
                        }
                      >
                        {person.following ? (
                          <>
                            <UserMinus className="w-4 h-4 mr-2" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFollowings.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No people found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or follow some new people!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingsPage;

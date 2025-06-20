
import { useState } from "react";
import Hero from "@/components/Hero";
import MostLikedBlogs from "@/components/MostLikedBlogs";
import TrendingTags from "@/components/TrendingTags";
import RecentVideos from "@/components/RecentVideos";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSignUp = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Hero onSignUp={handleSignUp} />
      <MostLikedBlogs />
      <TrendingTags />
      <RecentVideos />
      <ContactUs />
      <Footer />
      
      <AuthModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        initialView="signup"
      />
    </div>
  );
};

export default Index;

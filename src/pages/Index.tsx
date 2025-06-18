
import Hero from "@/components/Hero";
import MostLikedBlogs from "@/components/MostLikedBlogs";
import TrendingTags from "@/components/TrendingTags";
import RecentVideos from "@/components/RecentVideos";
import KnowledgeShare from "@/components/KnowledgeShare";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <MostLikedBlogs />
      <TrendingTags />
      <RecentVideos />
      <KnowledgeShare />
      <Footer />
    </div>
  );
};

export default Index;

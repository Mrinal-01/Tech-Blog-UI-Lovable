
import Hero from "@/components/Hero";
import MostLikedBlogs from "@/components/MostLikedBlogs";
import TrendingTags from "@/components/TrendingTags";
import RecentVideos from "@/components/RecentVideos";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Hero />
      <MostLikedBlogs />
      <TrendingTags />
      <RecentVideos />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;

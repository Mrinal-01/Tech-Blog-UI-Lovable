
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Learn, Collaborate, Grow
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of tech enthusiasts and level up your skills.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
              Get Started
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
        <div className="w-full h-full bg-gradient-to-l from-transparent to-purple-600/50"></div>
      </div>
    </section>
  );
};

export default Hero;

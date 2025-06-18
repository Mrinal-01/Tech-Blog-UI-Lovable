
import { Button } from "@/components/ui/button";

const KnowledgeShare = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Share Your Knowledge?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join our community of tech enthusiasts and start sharing your expertise with the world.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
            Create Account
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeShare;

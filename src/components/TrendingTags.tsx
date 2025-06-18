
const tags = [
  "React.js", "JavaScript", "Node.js", "TypeScript", "Next.js", "GraphQL", "Vue.js",
  "Python", "MongoDB", "Express.js"
];

const TrendingTags = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTags;

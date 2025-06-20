
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Save, Eye, Edit, Upload, ArrowLeft, HelpCircle } from "lucide-react";

const NewBlogPage = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    tags: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBlogData(prev => ({
          ...prev,
          thumbnail: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBlog = async () => {
    setIsLoading(true);
    
    try {
      console.log('Saving blog:', blogData);
      // Demo API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Blog saved successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdownPreview = (markdown: string) => {
    // Simple markdown renderer for demo - replace with proper markdown parser
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-$1">$2</code></pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/\n/gim, '<br>');
  };

  const handleMarkdownGuide = () => {
    window.open('https://www.markdownguide.org/cheat-sheet/', '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Edit className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blog Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {blogData.thumbnail ? (
                    <div className="relative">
                      <img
                        src={blogData.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Camera className="w-4 h-4" />
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Click to upload thumbnail</span>
                    </label>
                  )}
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={blogData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog title"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={blogData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
              </div>

              {/* Save Button */}
              <Button 
                onClick={handleSaveBlog}
                disabled={isLoading || !blogData.title || !blogData.description}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Blog'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkdownGuide}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  title="Markdown Guide"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm">Markdown Guide</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              <Tabs defaultValue="write" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write" className="flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Write</span>
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="mt-4 h-full">
                  <div className="h-full">
                    <Textarea
                      value={blogData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Write your blog content in Markdown...

# Your Title Here
## Subheading
### Sub-subheading

**Bold text** and *italic text*

```javascript
// Code block with syntax highlighting
function hello() {
  console.log('Hello, World!');
}
```

`inline code` and regular text.

- List item 1
- List item 2"
                      className="h-96 font-mono text-sm resize-none"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Supports Markdown formatting including code blocks with syntax highlighting
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-white">
                    {blogData.description ? (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: renderMarkdownPreview(blogData.description) 
                        }}
                      />
                    ) : (
                      <div className="text-gray-500 italic">
                        Write some content to see the preview...
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewBlogPage;

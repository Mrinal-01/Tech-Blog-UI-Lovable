
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Eye } from "lucide-react";

interface BlogData {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
}

const BlogEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState<BlogData>({
    id: parseInt(id || "1"),
    title: "",
    content: "",
    thumbnail: ""
  });

  useEffect(() => {
    // Simulate loading blog data
    const mockBlogData = {
      id: parseInt(id || "1"),
      title: "Getting Started with React and TypeScript",
      content: `# Getting Started with React and TypeScript

## Introduction
React with TypeScript provides excellent type safety and developer experience.

## Installation
\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Basic Component
\`\`\`tsx
import React from 'react';

interface Props {
  name: string;
}

const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
\`\`\`

This is a comprehensive guide to get you started with React and TypeScript development.`,
      thumbnail: "/placeholder.svg"
    };
    setBlogData(mockBlogData);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (field: keyof BlogData, value: string) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log('Saving blog:', blogData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Blog updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdownPreview = (markdown: string) => {
    // Simple markdown to HTML conversion for preview
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code class="language-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Blog</h1>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="flex items-center space-x-4">
                {blogData.thumbnail && (
                  <img 
                    src={blogData.thumbnail} 
                    alt="Thumbnail" 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
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
                placeholder="Enter blog title..."
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={blogData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog content in markdown..."
                rows={20}
                className="font-mono"
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {blogData.thumbnail && (
                <img 
                  src={blogData.thumbnail} 
                  alt={blogData.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold mb-6">{blogData.title || "Untitled Blog"}</h1>
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="mb-4">${renderMarkdownPreview(blogData.content) || "Start writing to see preview..."}</p>` 
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditPage;

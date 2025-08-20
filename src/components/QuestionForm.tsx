import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Plus, X, Send } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (title: string, description: string, tags: string[]) => void;
  onCancel: () => void;
}

export const QuestionForm = ({ onSubmit, onCancel }: QuestionFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description, tags);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card className="border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Ask a Question
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Question Title *
            </Label>
            <Input
              id="title"
              placeholder="What's your programming doubt?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-input border-border"
              required
            />
            <p className="text-xs text-muted-foreground">
              Be specific and clear about your problem
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Detailed Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your problem in detail. Include what you've tried, error messages, code snippets, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 bg-input border-border resize-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                placeholder="Add relevant tags (python, javascript, sql, etc.)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-input border-border"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="px-3"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Question
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
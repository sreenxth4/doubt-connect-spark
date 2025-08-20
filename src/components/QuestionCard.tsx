import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, User } from 'lucide-react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

export const QuestionCard = ({ question, onClick }: QuestionCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [votes, setVotes] = useState(question.votes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvoted) {
      setVotes(votes - 1);
      setUpvoted(false);
    } else {
      setVotes(votes + (downvoted ? 2 : 1));
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downvoted) {
      setVotes(votes + 1);
      setDownvoted(false);
    } else {
      setVotes(votes - (upvoted ? 2 : 1));
      setDownvoted(true);
      setUpvoted(false);
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card 
      className="hover:bg-card-hover transition-all duration-300 cursor-pointer border-border shadow-card hover:shadow-elevated group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {question.title}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{question.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{timeAgo(question.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={`p-1 h-auto ${upvoted ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <span className={`text-sm font-medium ${votes > 0 ? 'text-primary' : votes < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {votes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownvote}
              className={`p-1 h-auto ${downvoted ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {question.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>{question.answerCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
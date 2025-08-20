import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, User, Send, ArrowLeft } from 'lucide-react';
import { Question, Answer } from '@/types';

interface QuestionDetailProps {
  question: Question;
  answers: Answer[];
  onBack: () => void;
  onAddAnswer: (content: string) => void;
}

export const QuestionDetail = ({ question, answers, onBack, onAddAnswer }: QuestionDetailProps) => {
  const [answerContent, setAnswerContent] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'newest'>('votes');

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerContent.trim()) {
      onAddAnswer(answerContent);
      setAnswerContent('');
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const sortedAnswers = [...answers].sort((a, b) => {
    if (sortBy === 'votes') return b.votes - a.votes;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Questions
      </Button>

      {/* Question Details */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-3">
                {question.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
              <Button variant="ghost" size="sm" className="p-1 h-auto text-muted-foreground hover:text-primary">
                <ThumbsUp className="w-5 h-5" />
              </Button>
              <span className="text-lg font-bold text-primary">{question.votes}</span>
              <Button variant="ghost" size="sm" className="p-1 h-auto text-muted-foreground hover:text-destructive">
                <ThumbsDown className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-neutral max-w-none mb-6">
            <p className="text-foreground whitespace-pre-wrap">{question.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          
          <div className="flex space-x-2">
            <Button
              variant={sortBy === 'votes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('votes')}
            >
              Top Voted
            </Button>
            <Button
              variant={sortBy === 'newest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('newest')}
            >
              Newest
            </Button>
          </div>
        </div>

        {/* Answer List */}
        <div className="space-y-4">
          {sortedAnswers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </div>

        {/* Add Answer Form */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">Your Answer</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <Textarea
                placeholder="Share your knowledge and help solve this doubt..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                className="min-h-32 bg-input border-border resize-none"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Answer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AnswerCard = ({ answer }: { answer: Answer }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [votes, setVotes] = useState(answer.votes);

  const handleUpvote = () => {
    if (upvoted) {
      setVotes(votes - 1);
      setUpvoted(false);
    } else {
      setVotes(votes + (downvoted ? 2 : 1));
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const handleDownvote = () => {
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
    <Card className="border-border shadow-card">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-1">
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
          
          <div className="flex-1">
            <div className="prose prose-neutral max-w-none mb-4">
              <p className="text-foreground whitespace-pre-wrap">{answer.content}</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{answer.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{timeAgo(answer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
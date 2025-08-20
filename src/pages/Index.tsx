import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Users, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionForm } from '@/components/QuestionForm';
import { QuestionDetail } from '@/components/QuestionDetail';
import { AIChat } from '@/components/AIChat';
import { Question, Answer } from '@/types';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      title: 'How to optimize SQL queries for large datasets?',
      description: 'I\'m working with a database containing millions of records and my queries are running very slowly. I\'ve tried basic indexing but still facing performance issues. What are the best practices for optimizing SQL queries for large datasets?\n\nSpecific details:\n- PostgreSQL database\n- Table with 5M+ records\n- Complex JOIN operations\n- Query taking 30+ seconds',
      tags: ['SQL', 'PostgreSQL', 'Performance', 'Database'],
      author: 'Sarah Chen',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      votes: 15,
      answerCount: 3
    },
    {
      id: '2',
      title: 'Best practices for React state management in 2024?',
      description: 'I\'m building a medium-sized React application and struggling with state management. Should I use Context API, Redux Toolkit, or Zustand? What are the current best practices and when to use each approach?',
      tags: ['React', 'JavaScript', 'State Management', 'Frontend'],
      author: 'Alex Rodriguez',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      votes: 8,
      answerCount: 5
    },
    {
      id: '3',
      title: 'Python async/await vs threading for I/O operations',
      description: 'I need to make multiple API calls in my Python application. Should I use async/await or threading? What are the performance implications and when should I choose one over the other?',
      tags: ['Python', 'Async', 'Threading', 'Performance'],
      author: 'Michael Park',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      votes: 12,
      answerCount: 2
    }
  ]);
  
  const [answers] = useState<Answer[]>([
    {
      id: 'a1',
      questionId: '1',
      content: 'For PostgreSQL performance optimization with large datasets, here are key strategies:\n\n1. **Proper Indexing**:\n   - Use composite indexes for multi-column WHERE clauses\n   - Consider partial indexes for filtered queries\n   - Use EXPLAIN ANALYZE to identify missing indexes\n\n2. **Query Optimization**:\n   - Avoid SELECT * - only fetch needed columns\n   - Use LIMIT when possible\n   - Consider query rewriting to avoid expensive operations\n\n3. **Table Partitioning**:\n   - Partition large tables by date or other logical boundaries\n   - This can dramatically improve query performance\n\n4. **Connection Pooling**:\n   - Use pgBouncer or similar for connection management\n\nWould you like me to elaborate on any of these points?',
      author: 'Dr. Database Expert',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      votes: 23
    },
    {
      id: 'a2',
      questionId: '1',
      content: 'Additionally, consider these PostgreSQL-specific optimizations:\n\n- **Vacuum and Analyze**: Regular maintenance is crucial\n- **shared_buffers**: Increase to 25% of RAM\n- **work_mem**: Tune for your workload\n- **effective_cache_size**: Set to 75% of RAM\n\nFor your specific case with JOINs, make sure you have indexes on all join columns!',
      author: 'Performance Guru',
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      votes: 18
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setShowQuestionForm(false);
    setSelectedQuestion(null);
  };

  const handleAddQuestion = (title: string, description: string, tags: string[]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title,
      description,
      tags,
      author: userName || 'Anonymous',
      createdAt: new Date(),
      votes: 0,
      answerCount: 0
    };
    setQuestions([newQuestion, ...questions]);
    setShowQuestionForm(false);
  };

  const handleAddAnswer = (content: string) => {
    if (!selectedQuestion) return;
    // In a real app, this would make an API call
    console.log('Adding answer:', content);
  };

  const popularTags = ['Python', 'JavaScript', 'React', 'SQL', 'Machine Learning', 'Node.js', 'Java', 'C++'];

  if (selectedQuestion) {
    const questionAnswers = answers.filter(a => a.questionId === selectedQuestion.id);
    return (
      <div className="min-h-screen bg-background">
        <Header 
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userName={userName}
        />
        <main className="container mx-auto px-4 py-8">
          <QuestionDetail
            question={selectedQuestion}
            answers={questionAnswers}
            onBack={() => setSelectedQuestion(null)}
            onAddAnswer={handleAddAnswer}
          />
        </main>
        <AIChat />
      </div>
    );
  }

  if (showQuestionForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          userName={userName}
        />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <QuestionForm
            onSubmit={handleAddQuestion}
            onCancel={() => setShowQuestionForm(false)}
          />
        </main>
        <AIChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        userName={userName}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-primary-glow">Query Connect</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            The ultimate platform for students to share doubts, get expert answers, and learn together. 
            Connect with peers and AI assistance for instant programming help.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all duration-300"
              onClick={() => isLoggedIn ? setShowQuestionForm(true) : {}}
            >
              <Plus className="w-5 h-5 mr-2" />
              Ask Your First Question
            </Button>
            <div className="flex items-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>1.2k+ Students</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>500+ Questions</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-lg bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="p-6 rounded-lg bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Questions</span>
                    <span className="font-medium text-foreground">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Users</span>
                    <span className="font-medium text-foreground">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Answers Today</span>
                    <span className="font-medium text-foreground">23</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Questions</h2>
              {isLoggedIn && (
                <Button 
                  onClick={() => setShowQuestionForm(true)}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => setSelectedQuestion(question)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <AIChat />
    </div>
  );
};

export default Index;

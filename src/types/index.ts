export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: Date;
  votes: number;
  answerCount: number;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: string;
  createdAt: Date;
  votes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}
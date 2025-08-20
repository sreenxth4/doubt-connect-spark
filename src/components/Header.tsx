import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, User, LogOut } from 'lucide-react';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  userName?: string;
}

export const Header = ({ isLoggedIn, onLogin, onLogout, userName }: HeaderProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Query Connect
              </span>
            </div>
            
            <div className="relative w-96 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search questions, tags, or topics..."
                className="pl-10 bg-card border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span className="text-foreground">{userName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
      />
    </>
  );
};
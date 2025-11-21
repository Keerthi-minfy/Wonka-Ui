import { ReactNode } from 'react';
import { LogOut, User, Home, FolderOpen } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
  currentUser?: any;
  onLogout?: () => void;
  currentView?: 'projects' | 'create' | 'assessment' | 'dashboard';
  onNavigate?: (view: 'projects') => void;
}

export function Layout({ children, currentUser, onLogout, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-foreground">
                  <path d="M18.75 9.5L12 2.75L5.25 9.5h2.5v9h8.5v-9h2.5z" />
                </svg>
              </div>
              <h1 className="text-secondary-foreground font-semibold">Agentic AI Factory</h1>
            </div>

            {/* Navigation and User Actions */}
            {currentUser && (
              <div className="flex items-center gap-4">
                {/* Navigation Menu */}
                {onNavigate && (
                  <nav className="flex items-center gap-2">
                    <Button
                      variant={currentView === 'projects' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onNavigate('projects')}
                      className="gap-2"
                    >
                      <FolderOpen className="h-4 w-4" />
                      Projects
                    </Button>
                  </nav>
                )}

                {/* User Info */}
                <div className="flex items-center gap-2 text-sm text-secondary-foreground border-l border-border pl-4">
                  <User className="h-4 w-4" />
                  <span>{currentUser.username || currentUser.userId}</span>
                </div>

                {/* Logout Button */}
                {onLogout && (
                  <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Powered by Amazon Bedrock and AWS Services
          </p>
        </div>
      </footer>
    </div>
  );
}

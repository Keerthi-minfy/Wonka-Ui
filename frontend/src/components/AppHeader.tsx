import { Search, Bell, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface AppHeaderProps {
  currentUser?: any;
  onLogout?: () => void;
}
   {/* Hero Banner */}
      // <div
      //   className="mx-8 mt-6 py-8 px-8 text-center rounded-lg"
      //   style={{
      //     background: 'linear-gradient(to right, rgba(139, 69, 19, 0.8), rgba(120, 81, 169, 0.6), rgba(30, 58, 138, 0.8))',
      //     backdropFilter: 'blur(10px)',
      //   }}
      // >
      //   <div className="flex items-center justify-center gap-3 mb-3">
      //     {/* AWS Logo */}
      //     <svg viewBox="0 0 50 30" className="h-10 w-auto" style={{ fill: 'white' }}>
      //       <path d="M20.6 21.8c-3.6 2.7-8.8 4.1-13.3 4.1-6.3 0-12-2.3-16.3-6.2-.3-.3 0-.7.4-.5 4.6 2.7 10.4 4.3 16.3 4.3 4 0 8.4-.8 12.4-2.5.6-.3 1.1.4.5.8z"/>
      //       <path d="M22.3 19.9c-.5-.6-3.1-.3-4.3-.1-.4 0-.4-.3-.1-.6 2.1-1.5 5.6-1.1 6-.6.4.6-.1 4.4-2.3 6.2-.3.3-.6.1-.5-.2.4-1.1 1.4-3.6.9-4.3l.3-.4z"/>
      //     </svg>
      //     <h1 className="text-3xl font-semibold">
      //       <span style={{ color: '#FF9900' }}>AWS Agentic AI Factory</span>
      //     </h1>
      //   </div>
      //   <p className="text-sm" style={{ color: '#f7f6f3ff' }}>
      //     Enterprise-grade platform for building, deploying, and managing intelligent AI agentic systems at scale
      //   </p>
      // </div>

export function AppHeader({ currentUser, onLogout }: AppHeaderProps) {
  return (
    <div className="bg-[#000000] border-b border-[#1f1f1f]" style={{padding:"10px"}}>
      {/* Top Bar with Search and Icons */}
      <div className="h-14 flex items-center px-8">
        {/* Search Bar - 25% width */}
        <div style={{ width: '25%', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 10 }}>
            <Search className="w-4 h-4 text-[#9ca3af]" />
          </div>
          <input
            type="text"
            placeholder="Search requests, agents, blueprints..."
            className="w-full h-9 pr-4 text-white text-sm rounded-md outline-none transition-colors"
            style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid #1a1a1a',
              paddingLeft: '36px'
            }}
          />
          <style>{`
            input::placeholder {
              color: #6b7280;
            }
            input:focus {
              borderColor: #FF9900;
              outline: none;
            }
          `}</style>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="text-[#9ca3af] hover:text-white hover:bg-[#1a1a1a] h-9 w-9"
          >
            <Bell className="w-4 h-4" />
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="text-[#9ca3af] hover:text-white hover:bg-[#1a1a1a] h-9 w-9"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AWS Branding Section */}
      {/* <div className="py-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          <span style={{ color: 'white', fontSize: '0.875rem' }}>aws </span>
          <span style={{ color: 'white' }}>AWS Agentic AI Factory</span>
        </h1>
        <p className="text-sm" style={{ color: '#ff9900' }}>
          Enterprise-grade platform for building, deploying, and managing intelligent AI agentic systems at scale
        </p>
      </div> */}
    </div>
  );
}

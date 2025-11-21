import { Home, FileText, BoxSelect, Code, Blocks, Wrench, Database, Shield, MessageSquare, Bell, RefreshCw, Box, FileCode } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  className?: string;
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'create-request', label: 'Create Request', icon: FileText },
  { id: 'agent-blueprints', label: 'Agent Blueprints', icon: BoxSelect },
  { id: 'blueprint-studio', label: 'Blueprint Studio', icon: Code },
  { id: 'integrations', label: 'Integrations', icon: Blocks },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'data-stores', label: 'Data Stores', icon: Database },
  { id: 'security', label: 'Security & Compliance', icon: Shield },
  { id: 'chatboard', label: 'Chatboard Apps', icon: MessageSquare },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'agent-iteration', label: 'Agent Iteration', icon: RefreshCw },
  { id: 'amazoncoda', label: 'AmazonCoda', icon: Box },
  { id: 'agent-localization', label: 'AgentLocalization', icon: FileCode },
];

export function Sidebar({ className, activeItem = 'dashboard', onNavigate }: SidebarProps) {
  return (
    <aside className={cn(
      "w-64 bg-white border-r border-border flex-shrink-0 overflow-y-auto",
      className
    )}>
      <nav className="py-4">
        <ul className="px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li
                key={item.id}
                className={index < menuItems.length - 1 ? "border-b border-border/30" : ""}
              >
                <button
                  onClick={() => onNavigate?.(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                  style={isActive ? {
                    borderLeft: '3px solid #FF9900',
                    paddingLeft: 'calc(0.75rem - 3px)'
                  } : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

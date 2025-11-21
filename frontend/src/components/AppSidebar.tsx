import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  GitBranch,
  Wand2,
  Plug,
  Wrench,
  Database,
  Users,
  Shield,
  Package,
  Bell,
  Repeat,
  DollarSign,
  TrendingUp,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface AppSidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'intake-requests', label: 'Intake Requests', icon: Inbox },
  { id: 'agent-catalog', label: 'Agent Catalog', icon: FolderKanban },
  { id: 'agent-blueprints', label: 'Agent Blueprints', icon: GitBranch },
  { id: 'blueprint-studio', label: 'Blueprint Studio', icon: Wand2 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'data-stores', label: 'Data Stores', icon: Database },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'security', label: 'Security & Compliance', icon: Shield },
  { id: 'deployed-apps', label: 'Deployed Apps', icon: Package },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'agent-iteration', label: 'Agent Iteration', icon: Repeat },
  { id: 'agent-finops', label: 'AgentFinOps', icon: DollarSign },
  { id: 'agent-monetization', label: 'AgentMonetization', icon: TrendingUp },
];

export function AppSidebar({ activeItem = 'dashboard', onNavigate }: AppSidebarProps) {
  return (
    <div className="w-[200px] bg-[#0f0f0f] border-r border-[#1f1f1f] h-screen flex flex-col">
      {/* Logo and Customer Selector */}
      <div className="p-3 border-b border-[#1f1f1f]">
        <Button
          variant="ghost"
          className="w-full justify-between text-left hover:bg-[#1a1a1a] text-white h-auto p-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1a1a1a] rounded flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-[#6b7280]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-white">Customer 1</span>
              <span className="text-[10px] text-[#6b7280]">Enterprise Plan</span>
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-[#6b7280]" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                className="w-full flex items-center justify-start gap-3 text-white h-10 px-3 text-sm font-normal rounded-md cursor-pointer"
                style={{
                  backgroundColor: isActive ? '#2a2a2a' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#1f1f1f';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onClick={() => onNavigate?.(item.id)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-[#1f1f1f]">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-[#1f1f1f] h-10 px-3 text-sm rounded-md transition-colors"
        >
          <Wrench className="w-5 h-5" />
          <span>Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-[#1f1f1f] h-10 px-3 text-sm rounded-md transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span>Help</span>
        </Button>
      </div>
    </div>
  );
}

import { Search, MapPin, Code, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';


interface PipelineStage {
  id: string;
  label: string;
  count: number;
  icon: any;
  color: string;
  bgColor: string;
}

const stages: PipelineStage[] = [
  { id: 'assess', label: 'Assess', count: 2, icon: Search, color: '#00C896', bgColor: 'bg-[#1a2a35]' },
  { id: 'plan', label: 'Plan', count: 1, icon: MapPin, color: '#6B4DE6', bgColor: 'bg-[#261a3a]' },
  { id: 'implement', label: 'Implement', count: 1, icon: Code, color: '#FF9900', bgColor: 'bg-[#2a1f1a]' },
  { id: 'iterate', label: 'Iterate', count: 1, icon: RefreshCw, color: '#00D9E0', bgColor: 'bg-[#1a2a2f]' },
  { id: 'completed', label: 'Completed', count: 1, icon: CheckCircle, color: '#00C896', bgColor: 'bg-[#1a2a25]' },
];

export function RequestPipeline() {
  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a]">
      {/* Hero Banner with Gradient */}
      {/* <div className="relative overflow-hidden bg-gradient-to-r from-[#5c3a1f] via-[#2a1f3a] to-[#1a2540] px-8 py-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white text-2xl font-bold">aws</span>
            <span className="text-[#FF9900] text-2xl font-bold">AWS Agentic AI Factory</span>
          </div>
          <p className="text-[#c7a589] text-sm">
            Enterprise-grade platform for building, deploying, and managing intelligent AI agentic systems at scale
          </p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Request Pipeline Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white text-xl font-semibold">Request Pipeline</h2>
            <Button className="bg-white text-black hover:bg-gray-100 h-9 px-4">
              + New Request
            </Button>
          </div>
          <p className="text-[#6b7280] text-sm">
            Track requests through Assess → Plan → Implement → Iterate stages
          </p>
        </div>

        {/* Pipeline Stage Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className={`${stage.bgColor} border border-[#2a2a2a] rounded-lg p-4 hover:border-[#3a3a3a] transition-colors`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#9ca3af] text-sm font-medium">{stage.label}</span>
                  <Icon className="w-5 h-5" style={{ color: stage.color }} />
                </div>
                <div className="text-white text-3xl font-semibold">{stage.count}</div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-[#2a2a2a]">
          <button className="text-white text-sm font-medium pb-3 border-b-2 border-white">
            All (6)
          </button>
          <button className="text-[#6b7280] text-sm font-medium pb-3 hover:text-white transition-colors">
            Active (4)
          </button>
          <button className="text-[#6b7280] text-sm font-medium pb-3 hover:text-white transition-colors">
            Completed (1)
          </button>
        </div>

        {/* Project Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4">
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-base font-medium">
                  E-commerce Analytics Dashboard
                </h3>
                <Badge className="bg-red-600/20 text-red-400 border-red-600/30 text-xs px-2 py-0.5">
                  High
                </Badge>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                Build a comprehensive analytics dashboard for tracking sales, user behavior, and inventory
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-15</span>
                <span>•</span>
                <span>3 agents assigned</span>
              </div>
            </div>
            <button className="text-[#6b7280] hover:text-white">⋯</button>
          </div>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6B4DE6]" />
                <span className="text-white text-sm font-medium">Plan</span>
                <span className="text-[#6B4DE6] text-sm">in progress</span>
              </div>
              <span className="text-white text-sm font-medium">45% complete</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00C896] via-[#6B4DE6] to-transparent w-[45%]" />
            </div>
          </div>

          {/* Stage Progress Bars */}
          <div className="grid grid-cols-4 gap-4">
            {/* Assess Stage */}
            <div className="bg-[#0f0f0f] border border-[#00C896] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-[#00C896]" />
                <span className="text-white text-xs font-medium">Assess</span>
              </div>
              <div className="text-[#00C896] text-xs mb-2">100% complete</div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <button className="hover:text-white">Status & Details</button>
              </div>
            </div>

            {/* Plan Stage */}
            <div className="bg-[#0f0f0f] border border-[#6B4DE6] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#6B4DE6]" />
                <span className="text-white text-xs font-medium">Plan</span>
              </div>
              <div className="text-[#6B4DE6] text-xs mb-2">60% complete</div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <button className="hover:text-white">Status & Details</button>
              </div>
            </div>

            {/* Implement Stage */}
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-[#FF9900]" />
                <span className="text-[#9ca3af] text-xs font-medium">Implement</span>
              </div>
              <div className="text-[#6b7280] text-xs mb-2">0% complete</div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <button className="hover:text-white">Status & Details</button>
              </div>
            </div>

            {/* Iterate Stage */}
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-4 h-4 text-[#00D9E0]" />
                <span className="text-[#9ca3af] text-xs font-medium">Iterate</span>
              </div>
              <div className="text-[#6b7280] text-xs mb-2">0% complete</div>
              <div className="flex items-center justify-between text-xs text-[#6b7280]">
                <button className="hover:text-white">Status & Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

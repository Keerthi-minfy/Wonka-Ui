import { Search, CheckCircle, MapPin, Code, Repeat, CheckCircle2, MoreVertical, Pause } from 'lucide-react';
import { AwsBanner } from './ui/aws-banner';
import { StatusCard } from './ui/status-card';

export function IntakeRequests() {
  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a]" style={{margin:"15px"}}>
      {/* Hero Banner - Gradient from brown/orange to dark blue */}
     {/* Hero Banner */}
       <AwsBanner 
     
    />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {/* Request Pipeline Header */}
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold"  style={{marginTop:"15px"}}>Request Pipeline</h2>
          <p className="text-[#9ca3af] text-sm">
            Track requests through Assess → Plan → Implement → Iterate stages
          </p>
        </div>

        {/* Pipeline Stats Cards */}
        <div className="flex gap-4 mb-4">
          {/* Assess */}
          <div className="flex-1 rounded-lg p-4 border border-[#3b82f6]/30" style={{backgroundColor: "rgba(59, 130, 246, 0.1)"}}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm">Assess</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
            <p className="text-white text-3xl font-bold">2</p>
          </div>

          {/* Plan */}
          <div className="flex-1 rounded-lg p-4 border border-[#8B5CF6]/30" style={{backgroundColor: "rgba(139, 92, 246, 0.1)"}}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm">Plan</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
            <p className="text-white text-3xl font-bold">1</p>
          </div>

          {/* Implement */}
          <div className="flex-1 rounded-lg p-4 border border-[#FF9900]/30" style={{backgroundColor: "rgba(255, 153, 0, 0.1)"}}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm">Implement</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-[#FF9900]" />
              </div>
            </div>
            <p className="text-white text-3xl font-bold">1</p>
          </div>

          {/* Iterate */}
          <div className="flex-1 rounded-lg p-4 border border-[#06b6d4]/30" style={{backgroundColor: "rgba(6, 182, 212, 0.1)"}}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm">Iterate</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Repeat className="w-6 h-6 text-[#06b6d4]" />
              </div>
            </div>
            <p className="text-white text-3xl font-bold">1</p>
          </div>

          {/* Completed */}
          <div className="flex-1 rounded-lg p-4 border border-[#00C896]/30" style={{backgroundColor: "rgba(0, 200, 150, 0.1)"}}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm">Completed</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#00C896]" />
              </div>
            </div>
            <p className="text-white text-3xl font-bold">1</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-2 rounded-lg p-1" style={{backgroundColor: "rgb(37 37 37)", width:"22%", padding:"5px"}}>
          <button className="px-3 py-3 text-white text-base font-semibold rounded-lg transition-colors" style={{fontSize:"10px"}}>
            All (6)
          </button>
          <button className="px-3 py-3 text-[#6b7280] text-base font-medium hover:text-white transition-colors" style={{fontSize:"10px"}}>
            Active (4)
          </button>
          <button className="px-3 py-3 text-[#6b7280] text-base font-medium hover:text-white transition-colors" style={{fontSize:"10px"}}>
            Completed (1)
          </button>
        </div>

     
        {/* Request Card 1 - E-commerce Analytics Dashboard */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4 " style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">E-commerce Analytics Dashboard</h3>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded uppercase">
                  high
                </span>
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
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/20 rounded-full">
              <MapPin className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-[#8B5CF6] text-sm font-medium">Plan</span>
              <span className="text-[#8B5CF6] text-sm">in progress</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">45% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '45%', backgroundColor: '#8B5CF6', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6 flex-1" style={{display:"flex"}}>
            <StatusCard status="completed" style={{width:"25%"}} className="bg-[#0a0a0a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-[#00C896]" />
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="in_progress" style={{width:"25%"}} className="bg-[#0a0a0a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#3b82f6]" />
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#3b82f6] text-xs font-medium mb-3">60% complete</p>
              <button className="w-full px-3 py-2 bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" style={{width:"25%"}} className="bg-[#0a0a0a] rounded-lg p-4 opacity-60">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#FF9900]/20 flex items-center justify-center">
                  <Code className="w-3 h-3 text-[#FF9900]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" style={{width:"25%"}} className="bg-[#0a0a0a] rounded-lg p-4 opacity-60">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#06b6d4]/20 flex items-center justify-center">
                  <Repeat className="w-3 h-3 text-[#06b6d4]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Data Analyst AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  UI Designer AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Solution Architect AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium rounded transition-colors">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          </div>
        </div>

        {/* Request Card 2 - Customer Support Chatbot */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4" style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">Customer Support Chatbot</h3>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded uppercase">
                  medium
                </span>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                Create an intelligent chatbot for handling customer inquiries and support tickets
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-14</span>
                <span>•</span>
                <span>3 agents assigned</span>
              </div>
            </div>
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#3B82F6]/20 rounded-full">
              <Search className="w-3 h-3 text-[#3B82F6]" />
              <span className="text-[#3B82F6] text-sm font-medium">Assess</span>
              <span className="text-[#3B82F6] text-sm">in progress</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">25% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '25%', backgroundColor: '#3B82F6', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6" style={{display:"flex"}}>
            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#3B82F6]/20 flex items-center justify-center">
                  <Search className="w-3 h-3 text-[#3B82F6]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#3B82F6] text-xs font-medium mb-3">70% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#8B5CF6]/20 flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-[#8B5CF6]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#FF9900]/20 flex items-center justify-center">
                  <Code className="w-3 h-3 text-[#FF9900]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#06b6d4]/20 flex items-center justify-center">
                  <Repeat className="w-3 h-3 text-[#06b6d4]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  NLP Agent
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Business Analyst AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Requirements AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium rounded transition-colors">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          </div>
        </div>

        {/* Request Card 3 - Invoice Processing Automation */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4" style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">Invoice Processing Automation</h3>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded uppercase">
                  high
                </span>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                Automate invoice processing and approval workflow using OCR and ML
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-10</span>
                <span>•</span>
                <span>4 agents assigned</span>
              </div>
            </div>
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#00C896]/20 rounded-full">
              <CheckCircle className="w-3 h-3 text-[#00C896]" />
              <span className="text-[#00C896] text-sm font-medium">Done</span>
              <span className="text-[#00C896] text-sm">completed</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">100% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '100%', backgroundColor: '#00C896', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6" style={{display:"flex"}}>
            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  OCR Agent
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Workflow AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Backend AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Integration AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium rounded transition-colors">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          </div>
        </div>

        {/* Request Card 4 - Inventory Management System */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4" style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">Inventory Management System</h3>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded uppercase">
                  high
                </span>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                Develop a real-time inventory tracking system with predictive analytics and automated reordering
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-12</span>
                <span>•</span>
                <span>3 agents assigned</span>
              </div>
            </div>
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF9900]/20 rounded-full">
              <Code className="w-3 h-3 text-[#FF9900]" />
              <span className="text-[#FF9900] text-sm font-medium">Implement</span>
              <span className="text-[#FF9900] text-sm">in progress</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">75% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '75%', backgroundColor: '#FF9900', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6" style={{display:"flex"}}>
            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="in_progress" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#FF9900]/20 flex items-center justify-center">
                  <Code className="w-3 h-3 text-[#FF9900]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#FF9900] text-xs font-medium mb-3">75% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#06b6d4]/20 flex items-center justify-center">
                  <Repeat className="w-3 h-3 text-[#06b6d4]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]" style={{padding:"10px"}}>
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Backend AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Database AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  API AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium rounded transition-colors">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          </div>
        </div>

        {/* Request Card 5 - Marketing Campaign Optimizer */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4" style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">Marketing Campaign Optimizer</h3>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded uppercase">
                  medium
                </span>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                AI-driven marketing campaign optimization with A/B testing and performance prediction
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-08</span>
                <span>•</span>
                <span>3 agents assigned</span>
              </div>
            </div>
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#06b6d4]/20 rounded-full">
              <Repeat className="w-3 h-3 text-[#06b6d4]" />
              <span className="text-[#06b6d4] text-sm font-medium">Iterate</span>
              <span className="text-[#06b6d4] text-sm">in progress</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">85% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '85%', backgroundColor: '#06b6d4', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6" style={{display:"flex"}}>
            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="completed" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#00C896]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#00C896] text-xs font-medium mb-3">100% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="in_progress" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#06b6d4]/20 flex items-center justify-center">
                  <Repeat className="w-3 h-3 text-[#06b6d4]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#06b6d4] text-xs font-medium mb-3">60% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  ML Engineer AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Integration AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Testing AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium rounded transition-colors">
              <Pause className="w-4 h-4" />
              Pause
            </button>
          </div>
        </div>

        {/* Request Card 6 - HR Document Processing */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-4" style={{padding:"10px"}}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold">HR Document Processing</h3>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded uppercase">
                  low
                </span>
              </div>
              <p className="text-[#9ca3af] text-sm mb-3">
                Automate HR document processing including resume parsing and employee onboarding workflows
              </p>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span>Created 2024-01-16</span>
                <span>•</span>
                <span>2 agents assigned</span>
              </div>
            </div>
            <button className="text-[#9ca3af] hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#6b7280]/20 rounded-full">
              <Search className="w-3 h-3 text-[#6b7280]" />
              <span className="text-[#6b7280] text-sm font-medium">Assess</span>
              <span className="text-[#6b7280] text-sm">pending</span>
            </div>
            <span className="text-[#9ca3af] text-sm ml-auto">10% complete</span>
          </div>

          <div className="w-full rounded-full mb-6" style={{ backgroundColor: '#2a2a2a', height: '6px' }}>
            <div className="rounded-full" style={{ width: '10%', backgroundColor: '#6b7280', height: '6px' }}></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6" style={{display:"flex"}}>
            <StatusCard status="in_progress" className="bg-[#0a0a0a] rounded-lg p-4" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#3B82F6]/20 flex items-center justify-center">
                  <Search className="w-3 h-3 text-[#3B82F6]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Assess</h4>
              </div>
              <p className="text-[#3B82F6] text-xs font-medium mb-3">30% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-xs font-medium rounded transition-colors">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#8B5CF6]/20 flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-[#8B5CF6]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Plan</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#FF9900]/20 flex items-center justify-center">
                  <Code className="w-3 h-3 text-[#FF9900]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Implement</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>

            <StatusCard status="pending" className="bg-[#0a0a0a] rounded-lg p-4 opacity-60" style={{width:"25%"}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#06b6d4]/20 flex items-center justify-center">
                  <Repeat className="w-3 h-3 text-[#06b6d4]" />
                </div>
                <h4 className="text-white text-sm font-semibold">Iterate</h4>
              </div>
              <p className="text-[#9ca3af] text-xs font-medium mb-3">0% complete</p>
              <button className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b7280] text-xs font-medium rounded cursor-not-allowed">
                Status & Details
              </button>
            </StatusCard>
          </div>




          <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af] text-sm">Assigned agents:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  Document AI
                </span>
                <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-medium rounded">
                  HR Process AI
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f2f3f3] border border-[#d5dbdb] text-[#232f3e] text-sm font-medium rounded transition-colors">
              <span>▶</span>
              Start
            </button>
          </div>
        </div>

        {/* New Request Button */}
        <button className="w-full px-6 py-3 bg-white hover:bg-[#f2f3f3] border border-[#d5dbdb] text-[#232f3e] text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">+</span>
          New Request
        </button>
      </div>
    </div>
  );
}



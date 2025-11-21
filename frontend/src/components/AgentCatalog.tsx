import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Bot,
  Search,
  Filter,
  Star,
  Download,
  Play,
  Pause,
  Settings,
  Eye,
  Brain,
  FileText,
  Image,
  MessageSquare,
  Code,
  BarChart3,
  Database,
  Globe
} from "lucide-react";
import { AwsBanner } from "./ui/aws-banner";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: "active" | "inactive" | "updating";
  rating: number;
  downloads: number;
  capabilities: string[];
  type: "built-in" | "marketplace" | "custom";
  provider: string;
  lastUpdated: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Data Analyst AI",
    description: "Advanced data analysis and visualization agent with statistical modeling capabilities",
    category: "analytics",
    version: "v2.1.0",
    status: "active",
    rating: 4.8,
    downloads: 1250,
    capabilities: ["Statistical Analysis", "Data Visualization", "Predictive Modeling", "Report Generation"],
    type: "built-in",
    provider: "AI Factory",
    lastUpdated: "2024-01-15"
  },
  {
    id: "2",
    name: "UI Designer AI",
    description: "Creates modern UI designs and prototypes based on user requirements and best practices",
    category: "design",
    version: "v1.8.3",
    status: "active",
    rating: 4.6,
    downloads: 890,
    capabilities: ["UI Design", "Prototyping", "Design Systems", "Responsive Design"],
    type: "built-in",
    provider: "AI Factory",
    lastUpdated: "2024-01-12"
  },
  {
    id: "3",
    name: "Code Generator AI",
    description: "Generates clean, production-ready code in multiple programming languages",
    category: "development",
    version: "v3.0.1",
    status: "active",
    rating: 4.9,
    downloads: 2100,
    capabilities: ["Code Generation", "Code Review", "Testing", "Documentation"],
    type: "built-in",
    provider: "AI Factory",
    lastUpdated: "2024-01-14"
  },
  {
    id: "4",
    name: "NLP Processor",
    description: "Natural language processing for text analysis, sentiment detection, and content generation",
    category: "nlp",
    version: "v2.5.0",
    status: "inactive",
    rating: 4.4,
    downloads: 675,
    capabilities: ["Text Analysis", "Sentiment Analysis", "Language Translation", "Content Generation"],
    type: "built-in",
    provider: "AI Factory",
    lastUpdated: "2024-01-10"
  },
  {
    id: "5",
    name: "Image Processor AI",
    description: "Advanced image processing, recognition, and generation capabilities",
    category: "vision",
    version: "v1.6.2",
    status: "updating",
    rating: 4.7,
    downloads: 1450,
    capabilities: ["Image Recognition", "Image Enhancement", "Object Detection", "Image Generation"],
    type: "marketplace",
    provider: "AWS AI Marketplace",
    lastUpdated: "2024-01-13"
  },
  {
    id: "6",
    name: "Business Analyst AI",
    description: "Analyzes business processes and provides strategic insights and recommendations",
    category: "business",
    version: "v2.0.0",
    status: "active",
    rating: 4.5,
    downloads: 780,
    capabilities: ["Process Analysis", "Strategy Planning", "Market Research", "Risk Assessment"],
    type: "custom",
    provider: "Custom Development",
    lastUpdated: "2024-01-11"
  },
  {
    id: "7",
    name: "Custom CRM Agent",
    description: "Custom-built agent for managing customer relationships and sales processes",
    category: "business",
    version: "v1.2.0",
    status: "active",
    rating: 4.3,
    downloads: 245,
    capabilities: ["Lead Management", "Customer Tracking", "Sales Analytics", "Pipeline Management"],
    type: "custom",
    provider: "Internal Development",
    lastUpdated: "2024-01-09"
  },
  {
    id: "8",
    name: "AWS Comprehend Agent",
    description: "AWS-powered natural language processing for sentiment and entity analysis",
    category: "nlp",
    version: "v3.1.0",
    status: "active",
    rating: 4.8,
    downloads: 1890,
    capabilities: ["Entity Detection", "Sentiment Analysis", "Key Phrase Extraction", "Language Detection"],
    type: "marketplace",
    provider: "AWS AI Marketplace",
    lastUpdated: "2024-01-16"
  },
  {
    id: "9",
    name: "Custom Security Agent",
    description: "Custom security monitoring and threat detection agent",
    category: "security",
    version: "v2.0.1",
    status: "active",
    rating: 4.6,
    downloads: 156,
    capabilities: ["Threat Detection", "Security Monitoring", "Compliance Checking", "Risk Assessment"],
    type: "custom",
    provider: "Security Team",
    lastUpdated: "2024-01-14"
  }
];

const categories = [
  { id: "all", label: "All Agents", icon: Bot, count: mockAgents.length },
  { id: "analytics", label: "Analytics", icon: BarChart3, count: mockAgents.filter(a => a.category === "analytics").length },
  { id: "design", label: "Design", icon: Image, count: mockAgents.filter(a => a.category === "design").length },
  { id: "development", label: "Development", icon: Code, count: mockAgents.filter(a => a.category === "development").length },
  { id: "nlp", label: "NLP", icon: MessageSquare, count: mockAgents.filter(a => a.category === "nlp").length },
  { id: "vision", label: "Vision", icon: Eye, count: mockAgents.filter(a => a.category === "vision").length },
  { id: "business", label: "Business", icon: Brain, count: mockAgents.filter(a => a.category === "business").length }
];

export function AgentCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"built-in" | "marketplace" | "custom">("built-in");

  const filteredAgents = mockAgents.filter(agent => {
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesView = agent.type === viewMode;

    return matchesCategory && matchesSearch && matchesView;
  });

  return (
    <div className="space-y-6" style={{margin:"15px"}}>
      {/* AWS Banner */}
       <AwsBanner 
           
          />
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-semibold text-white" style={{ fontWeight: 600 }}>AI Agents</h1>
          <p className="text-sm mt-1" style={{ color: '#8b8b8b' }}>
            Discover, deploy, and manage AI agents for your workflows
          </p>
        </div>
        <button
          className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            height: '38px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <Bot className="h-4 w-4" />
          <span>Deploy Custom Agent</span>
        </button>
      </div>

      <Tabs value={viewMode} onValueChange={(value:any) => setViewMode(value as "built-in" | "marketplace" | "custom")}>
        <TabsList className="border-0 gap-1" style={{ backgroundColor: '#1a1a1a', padding: '4px', borderRadius: '8px' }}>
          <TabsTrigger
            value="built-in"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-[#8b8b8b] px-4 py-2 rounded-md font-medium text-sm border-0"
          >
            Built-in Agents
          </TabsTrigger>
          <TabsTrigger
            value="marketplace"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-[#8b8b8b] px-4 py-2 rounded-md font-medium text-sm border-0"
          >
            AWS AI Marketplace
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="data-[state=active]:bg-[#2a2a2a] data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-[#8b8b8b] px-4 py-2 rounded-md font-medium text-sm border-0"
          >
            Custom Agents
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-5">
          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div style={{ width: '360px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 10 }}>
                <Search className="h-4 w-4" style={{ color: '#6b7280' }} />
              </div>
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full pr-4 h-10 rounded-md outline-none transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #3a3a3a',
                  color: 'white',
                  fontSize: '14px',
                  paddingLeft: '36px'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#4a4a4a'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />
              <style>{`
                input::placeholder {
                  color: #6b7280;
                }
              `}</style>
            </div>
            <button
              className="gap-2 h-10 px-4 font-medium rounded-md inline-flex items-center transition-colors"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #3a3a3a',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2" style={{marginTop:"20px"}}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  className="gap-2 h-9 px-3 font-medium rounded-md inline-flex items-center transition-all"
                  style={{
                    backgroundColor: isActive ? '#ffffff' : '#1a1a1a',
                    color: isActive ? '#000000' : '#8b8b8b',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span
                    className="ml-1 text-xs px-1.5 py-0.5 font-semibold rounded"
                    style={{
                      backgroundColor: isActive ? '#000000' : '#0a0a0a',
                      color: isActive ? '#ffffff' : '#6b7280',
                      fontSize: '11px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          <TabsContent value={viewMode} className="mt-6">
            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="transition-all overflow-hidden"
                  style={{
                    backgroundColor: '#000000',
                    border: '1px solid #2a2a2a',
                    padding: '15px',
                    paddingTop: '20px'
                  }}
                >
                  <CardHeader className="p-0 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-semibold text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
                          {agent.name}
                        </CardTitle>
                        <Badge
                          className="text-xs px-2 py-0.5 border-0 font-semibold rounded"
                          style={{
                            backgroundColor: '#8B4513',
                            color: '#FF9900'
                          }}
                        >
                          {agent.type === "built-in" ? "Built-in" :
                           agent.type === "marketplace" ? "AWS Marketplace" :
                           "Custom"}
                        </Badge>
                      </div>
                      <Badge
                        className="text-xs px-2 py-0.5 border-0 font-semibold rounded"
                        style={{
                          backgroundColor: agent.status === "active" ? "transparent" : "transparent",
                          color: agent.status === "active" ? "#00ff00" : "#808080",
                          border: 'none'
                        }}
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed" style={{ color: '#8b8b8b', fontSize: '13px' }}>
                      {agent.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 p-0">
                    <div className="flex items-center justify-between text-sm pb-2">
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>Version</span>
                      <span className="text-white font-medium" style={{ fontSize: '13px' }}>{agent.version}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm py-1">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-white font-semibold" style={{ fontSize: '13px' }}>{agent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Download className="h-4 w-4" style={{ color: '#6b7280' }} />
                        <span className="text-white" style={{ fontSize: '13px' }}>{agent.downloads}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-sm font-semibold text-white" style={{ fontSize: '13px' }}>Capabilities</span>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs px-2 py-0.5 border-0 rounded font-medium"
                            style={{
                              backgroundColor: '#0a0a0a',
                              color: '#8b8b8b',
                              fontSize: '11px'
                            }}
                          >
                            {capability}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5 border-0 rounded font-medium"
                            style={{
                              backgroundColor: '#0a0a0a',
                              color: '#8b8b8b',
                              fontSize: '11px'
                            }}
                          >
                            +{agent.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3">
                      {agent.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1.5 h-9 font-medium border-0 rounded"
                          style={{
                            backgroundColor: '#0a0a0a',
                            color: 'white',
                            fontSize: '13px'
                          }}
                        >
                          <Pause className="h-4 w-4" />
                          Pause
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 gap-1.5 h-9 font-medium bg-white text-black hover:bg-gray-200 rounded"
                          style={{ fontSize: '13px' }}
                        >
                          <Play className="h-4 w-4" />
                          Deploy
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-9 px-4 font-medium border-0 rounded"
                        style={{
                          backgroundColor: '#0a0a0a',
                          color: 'white',
                          fontSize: '13px'
                        }}
                      >
                        <Settings className="h-4 w-4" />
                        Config
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-16">
                <Bot className="h-16 w-16 mx-auto mb-4" style={{ color: '#6b7280' }} />
                <h3 className="text-lg font-semibold mb-2 text-white" style={{ fontSize: '18px', fontWeight: 600 }}>
                  No agents found
                </h3>
                <p style={{ color: '#8b8b8b', fontSize: '14px' }}>
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

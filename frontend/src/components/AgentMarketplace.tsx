import { useState } from 'react';
import { Search, Plus, User } from 'lucide-react';
import { AgentCard, AgentCardProps } from './AgentCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from './ui/utils';

const filterCategories = [
  'Analytics',
  'Designs',
  'IT',
  'Development',
  'Staff',
  'AI Vision',
  'Reviews',
];

const sampleAgents: AgentCardProps[] = [
  {
    title: 'Advanced data analysis and visualization agent with statistical modeling capabilities',
    description: 'Statistical Analysis, Data Visualization, Predictive Modeling capabilities',
    version: '2.1',
    capabilities: ['Statistical Analysis', 'Data Visualization', 'Predictive Modeling', '+ 3 more'],
    likes: 1247,
    downloads: 8934,
  },
  {
    title: 'Creates modern UI designs and prototypes based on user requirements and best practices',
    description: 'UI Design, Prototyping, Design Systems capabilities',
    version: '3.5',
    capabilities: ['UI Design', 'Prototyping', 'Design Systems', '+ 5 more'],
    likes: 2156,
    downloads: 12453,
  },
  {
    title: 'Generates clean, production ready code in multiple programming languages',
    description: 'Code Generation, Code Review, Testing capabilities',
    version: '4.1',
    capabilities: ['Code Generation', 'Code Review', 'Testing', '+ 3 more'],
    likes: 3421,
    downloads: 15678,
  },
  {
    title: 'Natural language processing for text analysis, sentiment detection, and content generation',
    description: 'Text Analysis, Sentiment Detection, Content Generation capabilities',
    version: '2.8',
    capabilities: ['Text Analysis', 'Sentiment Analysis', 'Language Translation', '+ 4 more'],
    likes: 1876,
    downloads: 9234,
  },
];

interface AgentMarketplaceProps {
  onDeployCustomAgent?: () => void;
  currentUser?: any;
}

export function AgentMarketplace({ onDeployCustomAgent, currentUser }: AgentMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('bedrock-agents');

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
      {/* AWS Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-[20rem] font-bold text-gray-100 dark:text-gray-900 opacity-30 select-none leading-none">
          AWS
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">
                AWS Agentic AI Factory
              </h1>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade platform for building, deploying, and managing intelligent AI agents; systems at scale
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={onDeployCustomAgent} className="gap-2">
                <Plus className="h-4 w-4" />
                Deploy Custom Agent
              </Button>
              {currentUser && (
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-md border border-border">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {currentUser.username || currentUser.userId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-muted-foreground mb-6">
            Discover, deploy, and manage AI agents for your workflows
          </p>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="bedrock-agents">Bedrock Agents</TabsTrigger>
              <TabsTrigger value="aws-marketplace">AWS AI Marketplace</TabsTrigger>
              <TabsTrigger value="custom-agents">Custom Agents</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {filterCategories.map((filter) => (
                  <Badge
                    key={filter}
                    variant={selectedFilters.includes(filter) ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer transition-all px-3 py-1.5 text-xs',
                      selectedFilters.includes(filter)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-accent'
                    )}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>

              {/* Agent Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {sampleAgents.map((agent, index) => (
                  <AgentCard key={index} {...agent} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

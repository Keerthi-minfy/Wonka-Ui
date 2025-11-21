import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Workflow,
  Search,
  Plus,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Bot,
  ArrowRight,
  Settings,
  ShoppingCart,
  Download,
  Star
} from "lucide-react";
import { AwsBanner } from "./ui/aws-banner";

interface WorkflowStep {
  id: string;
  name: string;
  type: "agent" | "condition" | "action";
  config: any;
}

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  category: string;
  steps: WorkflowStep[];
  triggers: string[];
  executions: number;
  successRate: number;
  lastRun: string;
  createdBy: string;
  createdAt: string;
  estimatedTime: string;
  rating?: number;
  downloads?: number;
  price?: string;
}

const myWorkflows: WorkflowData[] = [
  {
    id: "1",
    name: "Procurement Process Workflow",
    description: "End-to-end procurement workflow from supplier onboarding to payment processing and record keeping",
    status: "active",
    category: "procurement",
    steps: [
      { id: "1", name: "Onboarding new supplier", type: "action", config: {} },
      { id: "2", name: "Create purchase order", type: "agent", config: {} },
      { id: "3", name: "Send for quotes", type: "action", config: {} },
      { id: "4", name: "Review analyse quotes", type: "agent", config: {} },
      { id: "5", name: "Receive and check invoices", type: "agent", config: {} },
      { id: "6", name: "Receive goods or services", type: "action", config: {} },
      { id: "7", name: "Send PO", type: "action", config: {} },
      { id: "8", name: "Authorise invoice", type: "condition", config: {} },
      { id: "9", name: "Send for payment", type: "action", config: {} },
      { id: "10", name: "Record keeping", type: "action", config: {} },
      { id: "11", name: "Done", type: "action", config: {} }
    ],
    triggers: ["Manual", "Scheduled"],
    executions: 347,
    successRate: 96.8,
    lastRun: "1 hour ago",
    createdBy: "Procurement Team",
    createdAt: "2024-01-18",
    estimatedTime: "2-4 weeks"
  },
  {
    id: "2",
    name: "Smart Grid Outage Detection and Resolution",
    description: "Automated detection and resolution of power grid outages with real-time monitoring and dispatch",
    status: "active",
    category: "utilities",
    steps: [
      { id: "1", name: "Monitor grid sensors", type: "agent", config: {} },
      { id: "2", name: "Detect anomalies", type: "agent", config: {} },
      { id: "3", name: "Identify outage location", type: "agent", config: {} },
      { id: "4", name: "Assess impact", type: "agent", config: {} },
      { id: "5", name: "Dispatch repair team", type: "action", config: {} },
      { id: "6", name: "Track resolution", type: "agent", config: {} },
      { id: "7", name: "Verify restoration", type: "condition", config: {} },
      { id: "8", name: "Generate report", type: "agent", config: {} }
    ],
    triggers: ["Sensor Alert", "Customer Report", "Automated Scan"],
    executions: 2156,
    successRate: 98.4,
    lastRun: "30 minutes ago",
    createdBy: "Grid Operations",
    createdAt: "2024-01-20",
    estimatedTime: "15-45 minutes"
  },
  {
    id: "3",
    name: "Investment Research",
    description: "Comprehensive investment analysis and recommendation engine with market data integration",
    status: "active",
    category: "finance",
    steps: [
      { id: "1", name: "Identify investment opportunities", type: "agent", config: {} },
      { id: "2", name: "Gather market data", type: "action", config: {} },
      { id: "3", name: "Analyze financials", type: "agent", config: {} },
      { id: "4", name: "Risk assessment", type: "agent", config: {} },
      { id: "5", name: "Generate recommendations", type: "agent", config: {} },
      { id: "6", name: "Create investment report", type: "agent", config: {} }
    ],
    triggers: ["Scheduled", "Market Event", "Manual"],
    executions: 543,
    successRate: 91.2,
    lastRun: "3 hours ago",
    createdBy: "Investment Team",
    createdAt: "2024-01-22",
    estimatedTime: "2-4 hours"
  },
  {
    id: "4",
    name: "Dynamic Pricing",
    description: "Real-time pricing optimization based on market conditions, demand patterns, and competitor analysis",
    status: "active",
    category: "ecommerce",
    steps: [
      { id: "1", name: "Monitor market conditions", type: "agent", config: {} },
      { id: "2", name: "Analyze demand patterns", type: "agent", config: {} },
      { id: "3", name: "Evaluate competitor pricing", type: "agent", config: {} },
      { id: "4", name: "Calculate optimal price", type: "agent", config: {} },
      { id: "5", name: "Apply pricing rules", type: "condition", config: {} },
      { id: "6", name: "Update pricing", type: "action", config: {} },
      { id: "7", name: "Monitor performance", type: "agent", config: {} }
    ],
    triggers: ["Scheduled", "Market Change", "Inventory Update"],
    executions: 4891,
    successRate: 93.7,
    lastRun: "10 minutes ago",
    createdBy: "Pricing Team",
    createdAt: "2024-01-25",
    estimatedTime: "5-10 minutes"
  },
  {
    id: "5",
    name: "Billing Automation",
    description: "End-to-end automated billing process from usage collection to payment tracking and dispute resolution",
    status: "active",
    category: "finance",
    steps: [
      { id: "1", name: "Collect usage data", type: "action", config: {} },
      { id: "2", name: "Calculate charges", type: "agent", config: {} },
      { id: "3", name: "Apply discounts/taxes", type: "agent", config: {} },
      { id: "4", name: "Generate invoice", type: "agent", config: {} },
      { id: "5", name: "Send to customer", type: "action", config: {} },
      { id: "6", name: "Track payment", type: "agent", config: {} },
      { id: "7", name: "Handle disputes", type: "condition", config: {} },
      { id: "8", name: "Record transaction", type: "action", config: {} }
    ],
    triggers: ["End of Billing Cycle", "Usage Threshold", "Manual"],
    executions: 3247,
    successRate: 97.1,
    lastRun: "1 hour ago",
    createdBy: "Finance Team",
    createdAt: "2024-01-28",
    estimatedTime: "10-15 minutes"
  },
  {
    id: "6",
    name: "Invoice Processing Pipeline",
    description: "Automated invoice processing from receipt to approval with OCR and validation",
    status: "active",
    category: "finance",
    steps: [
      { id: "1", name: "OCR Document", type: "agent", config: {} },
      { id: "2", name: "Validate Data", type: "condition", config: {} },
      { id: "3", name: "Generate Report", type: "agent", config: {} },
      { id: "4", name: "Send Notification", type: "action", config: {} }
    ],
    triggers: ["Email Received", "File Upload"],
    executions: 1247,
    successRate: 94.2,
    lastRun: "2 hours ago",
    createdBy: "Admin",
    createdAt: "2024-01-10",
    estimatedTime: "3-5 minutes"
  },
  {
    id: "7",
    name: "Customer Support Triage",
    description: "Automatically categorize and route customer support tickets based on content analysis",
    status: "active",
    category: "support",
    steps: [
      { id: "1", name: "Analyze Ticket", type: "agent", config: {} },
      { id: "2", name: "Categorize Issue", type: "condition", config: {} },
      { id: "3", name: "Assign Agent", type: "action", config: {} },
      { id: "4", name: "Update CRM", type: "action", config: {} }
    ],
    triggers: ["New Ticket", "Escalation"],
    executions: 892,
    successRate: 87.5,
    lastRun: "15 minutes ago",
    createdBy: "Support Team",
    createdAt: "2024-01-08",
    estimatedTime: "1-2 minutes"
  },
  {
    id: "8",
    name: "Content Generation Pipeline",
    description: "Generate blog posts, social media content, and marketing materials based on topics",
    status: "draft",
    category: "marketing",
    steps: [
      { id: "1", name: "Research Topic", type: "agent", config: {} },
      { id: "2", name: "Generate Content", type: "agent", config: {} },
      { id: "3", name: "Review Quality", type: "condition", config: {} },
      { id: "4", name: "Publish Content", type: "action", config: {} }
    ],
    triggers: ["Scheduled", "Manual"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "Marketing Team",
    createdAt: "2024-01-15",
    estimatedTime: "10-15 minutes"
  }
];

const builtInWorkflows: WorkflowData[] = [
  {
    id: "b1",
    name: "Data Processing & Analysis",
    description: "Standard workflow for ingesting, processing, and analyzing structured and unstructured data",
    status: "active",
    category: "analytics",
    steps: [
      { id: "1", name: "Data Ingestion", type: "action", config: {} },
      { id: "2", name: "Data Cleaning", type: "agent", config: {} },
      { id: "3", name: "Analysis", type: "agent", config: {} },
      { id: "4", name: "Visualization", type: "agent", config: {} }
    ],
    triggers: ["Data Upload", "Scheduled"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Factory",
    createdAt: "Built-in",
    estimatedTime: "5-10 minutes"
  },
  {
    id: "b2",
    name: "Document Understanding",
    description: "Extract insights from documents using OCR, NLP, and entity recognition",
    status: "active",
    category: "document",
    steps: [
      { id: "1", name: "Document Upload", type: "action", config: {} },
      { id: "2", name: "OCR Processing", type: "agent", config: {} },
      { id: "3", name: "Entity Extraction", type: "agent", config: {} },
      { id: "4", name: "Classification", type: "agent", config: {} }
    ],
    triggers: ["File Upload", "API Call"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Factory",
    createdAt: "Built-in",
    estimatedTime: "2-4 minutes"
  },
  {
    id: "b3",
    name: "Conversational AI Assistant",
    description: "Multi-turn conversational agent with context awareness and memory",
    status: "active",
    category: "ai-assistant",
    steps: [
      { id: "1", name: "Input Processing", type: "action", config: {} },
      { id: "2", name: "Intent Recognition", type: "agent", config: {} },
      { id: "3", name: "Context Management", type: "agent", config: {} },
      { id: "4", name: "Response Generation", type: "agent", config: {} }
    ],
    triggers: ["User Message", "Event"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Factory",
    createdAt: "Built-in",
    estimatedTime: "< 1 minute"
  },
  {
    id: "b4",
    name: "Code Generation & Review",
    description: "Generate, review, and optimize code based on requirements and best practices",
    status: "active",
    category: "development",
    steps: [
      { id: "1", name: "Requirements Analysis", type: "agent", config: {} },
      { id: "2", name: "Code Generation", type: "agent", config: {} },
      { id: "3", name: "Code Review", type: "agent", config: {} },
      { id: "4", name: "Testing", type: "agent", config: {} }
    ],
    triggers: ["Manual", "Git Commit"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Factory",
    createdAt: "Built-in",
    estimatedTime: "5-15 minutes"
  }
];

const marketplaceWorkflows: WorkflowData[] = [
  {
    id: "m1",
    name: "AWS Bedrock Multi-Agent Orchestrator",
    description: "Enterprise-grade multi-agent orchestration using AWS Bedrock for complex reasoning tasks",
    status: "inactive",
    category: "enterprise",
    steps: [
      { id: "1", name: "Task Planning", type: "agent", config: {} },
      { id: "2", name: "Agent Selection", type: "condition", config: {} },
      { id: "3", name: "Parallel Execution", type: "agent", config: {} },
      { id: "4", name: "Result Aggregation", type: "agent", config: {} }
    ],
    triggers: ["API Call", "Event"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Marketplace",
    createdAt: "2024-01-01",
    estimatedTime: "Variable",
    rating: 4.8,
    downloads: 1247,
    price: "$299/month"
  },
  {
    id: "m2",
    name: "Financial Document Analyzer Pro",
    description: "Advanced financial document analysis with compliance checking and fraud detection",
    status: "inactive",
    category: "finance",
    steps: [
      { id: "1", name: "Document Ingestion", type: "action", config: {} },
      { id: "2", name: "Financial Analysis", type: "agent", config: {} },
      { id: "3", name: "Compliance Check", type: "agent", config: {} },
      { id: "4", name: "Risk Assessment", type: "agent", config: {} }
    ],
    triggers: ["Upload", "Scheduled"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Marketplace",
    createdAt: "2024-01-05",
    estimatedTime: "5-8 minutes",
    rating: 4.6,
    downloads: 892,
    price: "$199/month"
  },
  {
    id: "m3",
    name: "Healthcare NLP Suite",
    description: "HIPAA-compliant medical document processing and clinical decision support",
    status: "inactive",
    category: "healthcare",
    steps: [
      { id: "1", name: "Document Processing", type: "agent", config: {} },
      { id: "2", name: "Medical Entity Extraction", type: "agent", config: {} },
      { id: "3", name: "Clinical Coding", type: "agent", config: {} },
      { id: "4", name: "Report Generation", type: "agent", config: {} }
    ],
    triggers: ["EMR Integration", "Manual"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Marketplace",
    createdAt: "2023-12-15",
    estimatedTime: "3-6 minutes",
    rating: 4.9,
    downloads: 567,
    price: "$499/month"
  },
  {
    id: "m4",
    name: "Legal Contract Intelligence",
    description: "AI-powered contract analysis, clause extraction, and risk identification",
    status: "inactive",
    category: "legal",
    steps: [
      { id: "1", name: "Contract Upload", type: "action", config: {} },
      { id: "2", name: "Clause Extraction", type: "agent", config: {} },
      { id: "3", name: "Risk Analysis", type: "agent", config: {} },
      { id: "4", name: "Compliance Review", type: "agent", config: {} }
    ],
    triggers: ["Upload", "Email"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Marketplace",
    createdAt: "2024-01-12",
    estimatedTime: "8-12 minutes",
    rating: 4.7,
    downloads: 423,
    price: "$399/month"
  },
  {
    id: "m5",
    name: "E-commerce Recommendation Engine",
    description: "Personalized product recommendations using collaborative filtering and deep learning",
    status: "inactive",
    category: "ecommerce",
    steps: [
      { id: "1", name: "User Behavior Analysis", type: "agent", config: {} },
      { id: "2", name: "Product Matching", type: "agent", config: {} },
      { id: "3", name: "Personalization", type: "agent", config: {} },
      { id: "4", name: "Ranking", type: "agent", config: {} }
    ],
    triggers: ["User Session", "API Call"],
    executions: 0,
    successRate: 0,
    lastRun: "Never",
    createdBy: "AWS Marketplace",
    createdAt: "2024-01-08",
    estimatedTime: "< 1 second",
    rating: 4.5,
    downloads: 1089,
    price: "$149/month"
  }
];

const categories = [
  { id: "all", label: "All Categories" },
  { id: "procurement", label: "Procurement" },
  { id: "utilities", label: "Utilities" },
  { id: "finance", label: "Finance" },
  { id: "support", label: "Support" },
  { id: "marketing", label: "Marketing" },
  { id: "analytics", label: "Analytics" },
  { id: "document", label: "Document" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "development", label: "Development" },
  { id: "enterprise", label: "Enterprise" },
  { id: "healthcare", label: "Healthcare" },
  { id: "legal", label: "Legal" },
  { id: "ecommerce", label: "E-commerce" }
];

const statusColors = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
};

const stepTypeIcons = {
  agent: Bot,
  condition: AlertCircle,
  action: Settings
};

export function AgentBlueprints() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"my-blueprints" | "built-in" | "marketplace">("my-blueprints");

  const getCurrentWorkflows = () => {
    switch (viewMode) {
      case "built-in":
        return builtInWorkflows;
      case "marketplace":
        return marketplaceWorkflows;
      default:
        return myWorkflows;
    }
  };

  const filteredWorkflows = getCurrentWorkflows().filter(workflow => {
    const matchesCategory = selectedCategory === "all" || workflow.category === selectedCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AwsBanner />

      <div className="flex items-center justify-between">
        <div>
          <h1>Agent Blueprints</h1>
          <p className="text-muted-foreground">
            Design, deploy, and manage automated AI workflows (workflows represent multi-agent orchestration to deliver an outcome)
          </p>
        </div>
        {viewMode === "my-blueprints" && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Blueprint
          </Button>
        )}
      </div>

      <Tabs value={viewMode} onValueChange={(value:any) => setViewMode(value as any)}>
        <TabsList>
          <TabsTrigger value="built-in">Built-in Workflows</TabsTrigger>
          <TabsTrigger value="marketplace">AWS AI Marketplace</TabsTrigger>
          <TabsTrigger value="my-blueprints">My Blueprints</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search workflows..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Built-in Workflows */}
          <TabsContent value="built-in" className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Workflow className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 dark:text-purple-100">Built-in Workflows</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    Pre-configured workflows optimized for common AI use cases. Deploy instantly or customize to your needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            Built-in
                          </Badge>
                        </div>
                        <CardDescription className="mb-3">
                          {workflow.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{workflow.steps.length} steps</span>
                          <span>•</span>
                          <span>{workflow.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Workflow Steps Preview */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Workflow Steps</span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {workflow.steps.map((step, index) => {
                          const StepIcon = stepTypeIcons[step.type];
                          return (
                            <div key={step.id} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-secondary/50 rounded px-2 py-1 whitespace-nowrap">
                                <StepIcon className="h-3 w-3" />
                                <span className="text-xs">{step.name}</span>
                              </div>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Copy className="h-3 w-3" />
                        Clone & Customize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-12">
                <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No workflows found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </TabsContent>

          {/* AWS Marketplace */}
          <TabsContent value="marketplace" className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <ShoppingCart className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-900 dark:text-orange-100">AWS AI Marketplace</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Premium workflows from AWS partners and verified developers. Enterprise-grade solutions for specialized use cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-lg transition-shadow border-orange-200 dark:border-orange-900">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                            Marketplace
                          </Badge>
                          {workflow.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{workflow.rating}</span>
                            </div>
                          )}
                        </div>
                        <CardDescription className="mb-3">
                          {workflow.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{workflow.downloads} downloads</span>
                          <span>•</span>
                          <span>{workflow.steps.length} steps</span>
                          <span>•</span>
                          <span className="font-medium text-orange-600">{workflow.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Workflow Steps Preview */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Workflow Steps</span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {workflow.steps.map((step, index) => {
                          const StepIcon = stepTypeIcons[step.type];
                          return (
                            <div key={step.id} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-secondary/50 rounded px-2 py-1 whitespace-nowrap">
                                <StepIcon className="h-3 w-3" />
                                <span className="text-xs">{step.name}</span>
                              </div>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="gap-1 bg-orange-600 hover:bg-orange-700">
                        <ShoppingCart className="h-3 w-3" />
                        Subscribe
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Try Free Trial
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No marketplace workflows found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </TabsContent>

          {/* My Blueprints */}
          <TabsContent value="my-blueprints" className="space-y-4">
            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <Badge className={statusColors[workflow.status]} variant="secondary">
                            {workflow.status}
                          </Badge>
                        </div>
                        <CardDescription className="mb-3">
                          {workflow.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created by {workflow.createdBy}</span>
                          <span>•</span>
                          <span>{workflow.createdAt}</span>
                          <span>•</span>
                          <span>{workflow.steps.length} steps</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Workflow Steps Preview */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Workflow Steps</span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {workflow.steps.map((step, index) => {
                          const StepIcon = stepTypeIcons[step.type];
                          return (
                            <div key={step.id} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-secondary/50 rounded px-2 py-1 whitespace-nowrap">
                                <StepIcon className="h-3 w-3" />
                                <span className="text-xs">{step.name}</span>
                              </div>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 pt-2 border-t">
                      <div className="text-center">
                        <div className="font-medium">{workflow.executions}</div>
                        <div className="text-xs text-muted-foreground">Executions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{workflow.successRate}%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{workflow.estimatedTime}</div>
                        <div className="text-xs text-muted-foreground">Est. Time</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{workflow.lastRun}</div>
                        <div className="text-xs text-muted-foreground">Last Run</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {workflow.status === "active" ? (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Pause className="h-3 w-3" />
                          Pause
                        </Button>
                      ) : (
                        <Button size="sm" className="gap-1">
                          <Play className="h-3 w-3" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="gap-1">
                        <BarChart3 className="h-3 w-3" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Settings className="h-3 w-3" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-12">
                <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No blueprints found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or category filters, or create your first blueprint
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Blueprint
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
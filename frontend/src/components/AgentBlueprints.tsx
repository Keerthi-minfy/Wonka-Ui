import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  Play,
  Pause,
  Copy,
  Trash2,
  BarChart3,
  Settings,
  ArrowRight,
  Edit,
  Workflow,
  Download,
  Circle,
  Upload,
  ScanLine,
  Filter,
  PieChart,
  Database,
  Tag,
  MessageSquare,
  FileText,
  Star,
  ShoppingCart
} from "lucide-react";
import { AwsBanner } from "./ui/aws-banner";

interface WorkflowStep {
  id: string;
  name: string;
  icon: string;
}

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft";
  createdBy: string;
  createdAt: string;
  steps: WorkflowStep[];
  executions: number;
  successRate: number;
  estimatedTime: string;
  lastRun: string;
  stepsCount: number;
}

interface MarketplaceWorkflow {
  id: string;
  name: string;
  description: string;
  rating: number;
  downloads: number;
  price: string;
  steps: WorkflowStep[];
  stepsCount: number;
  badge: string;
}

const workflows: WorkflowData[] = [
  {
    id: "1",
    name: "Procurement Process Workflow",
    description: "End-to-end procurement workflow from supplier onboarding to payment processing and record keeping",
    status: "active",
    createdBy: "Procurement Team",
    createdAt: "2024-01-18",
    stepsCount: 11,
    steps: [
      { id: "1", name: "Onboarding new supplier", icon: "user" },
      { id: "2", name: "Create purchase order", icon: "file" },
      { id: "3", name: "Send for quotes", icon: "send" },
      { id: "4", name: "Review analyse quotes", icon: "eye" },
      { id: "5", name: "Receive and check invoices", icon: "check" },
      { id: "6", name: "Receive goods or services", icon: "package" },
      { id: "7", name: "Send PO", icon: "send" },
      { id: "8", name: "Authorise invoice", icon: "check-circle" },
      { id: "9", name: "Send for payment", icon: "dollar" },
      { id: "10", name: "Record keeping", icon: "database" },
      { id: "11", name: "Done", icon: "check" }
    ],
    executions: 347,
    successRate: 96.8,
    estimatedTime: "2-4 weeks",
    lastRun: "1 hour ago"
  },
  {
    id: "2",
    name: "Smart Grid Outage Detection and Resolution",
    description: "Automated detection and resolution of power grid outages with real-time monitoring and dispatch",
    status: "active",
    createdBy: "Grid Operations",
    createdAt: "2024-01-20",
    stepsCount: 8,
    steps: [
      { id: "1", name: "Monitor grid sensors", icon: "activity" },
      { id: "2", name: "Detect anomalies", icon: "alert" },
      { id: "3", name: "Identify outage location", icon: "map-pin" },
      { id: "4", name: "Assess impact", icon: "gauge" },
      { id: "5", name: "Dispatch repair team", icon: "users" },
      { id: "6", name: "Track resolution", icon: "target" },
      { id: "7", name: "Verify restoration", icon: "check-circle" },
      { id: "8", name: "Generate report", icon: "file-text" }
    ],
    executions: 2156,
    successRate: 98.4,
    estimatedTime: "15-45 minutes",
    lastRun: "30 minutes ago"
  },
  {
    id: "3",
    name: "Investment Research",
    description: "Comprehensive investment analysis and recommendation engine with market data integration",
    status: "active",
    createdBy: "Investment Team",
    createdAt: "2024-01-22",
    stepsCount: 6,
    steps: [
      { id: "1", name: "Identify investment opportunities", icon: "search" },
      { id: "2", name: "Gather market data", icon: "database" },
      { id: "3", name: "Analyze financials", icon: "chart" },
      { id: "4", name: "Risk assessment", icon: "alert" },
      { id: "5", name: "Generate recommendations", icon: "file" },
      { id: "6", name: "Create investment report", icon: "check" }
    ],
    executions: 543,
    successRate: 91.2,
    estimatedTime: "2-4 hours",
    lastRun: "3 hours ago"
  },
  {
    id: "4",
    name: "Dynamic Pricing",
    description: "Real-time pricing optimization based on market conditions, demand patterns, and competitor analysis",
    status: "active",
    createdBy: "Pricing Team",
    createdAt: "2024-01-25",
    stepsCount: 7,
    steps: [
      { id: "1", name: "Monitor market conditions", icon: "activity" },
      { id: "2", name: "Analyze demand patterns", icon: "chart" },
      { id: "3", name: "Evaluate competitor pricing", icon: "search" },
      { id: "4", name: "Calculate optimal price", icon: "calculator" },
      { id: "5", name: "Apply pricing rules", icon: "check" },
      { id: "6", name: "Update pricing", icon: "refresh" },
      { id: "7", name: "Monitor performance", icon: "gauge" }
    ],
    executions: 4891,
    successRate: 93.7,
    estimatedTime: "5-10 minutes",
    lastRun: "10 minutes ago"
  },
  {
    id: "5",
    name: "Billing Automation",
    description: "End-to-end automated billing process from usage collection to payment tracking and dispute resolution",
    status: "active",
    createdBy: "Finance Team",
    createdAt: "2024-01-28",
    stepsCount: 8,
    steps: [
      { id: "1", name: "Collect usage data", icon: "database" },
      { id: "2", name: "Calculate charges", icon: "calculator" },
      { id: "3", name: "Apply discounts/taxes", icon: "tag" },
      { id: "4", name: "Generate invoice", icon: "file" },
      { id: "5", name: "Send to customer", icon: "send" },
      { id: "6", name: "Track payment", icon: "check" },
      { id: "7", name: "Handle disputes", icon: "alert" },
      { id: "8", name: "Record transaction", icon: "database" }
    ],
    executions: 3247,
    successRate: 97.1,
    estimatedTime: "10-15 minutes",
    lastRun: "1 hour ago"
  },
  {
    id: "6",
    name: "Invoice Processing Pipeline",
    description: "Automated invoice processing from receipt to approval with OCR and validation",
    status: "active",
    createdBy: "Admin",
    createdAt: "2024-01-10",
    stepsCount: 4,
    steps: [
      { id: "1", name: "OCR Document", icon: "scan" },
      { id: "2", name: "Validate Data", icon: "check-circle" },
      { id: "3", name: "Generate Report", icon: "file-text" },
      { id: "4", name: "Send Notification", icon: "bell" }
    ],
    executions: 1247,
    successRate: 94.2,
    estimatedTime: "3-5 minutes",
    lastRun: "2 hours ago"
  },
  {
    id: "7",
    name: "Customer Support Triage",
    description: "Automatically categorize and route customer support tickets based on content analysis",
    status: "active",
    createdBy: "Support Team",
    createdAt: "2024-01-08",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Analyze Ticket", icon: "search" },
      { id: "2", name: "Categorize Issue", icon: "tag" },
      { id: "3", name: "Assign Agent", icon: "user" },
      { id: "4", name: "Update CRM", icon: "database" }
    ],
    executions: 892,
    successRate: 87.5,
    estimatedTime: "1-2 minutes",
    lastRun: "15 minutes ago"
  },
  {
    id: "8",
    name: "Content Generation Pipeline",
    description: "Generate blog posts, social media content, and marketing materials based on topics",
    status: "draft",
    createdBy: "Marketing Team",
    createdAt: "2024-01-15",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Research Topic", icon: "search" },
      { id: "2", name: "Generate Content", icon: "file-text" },
      { id: "3", name: "Review Quality", icon: "check-circle" },
      { id: "4", name: "Publish Content", icon: "send" }
    ],
    executions: 0,
    successRate: 0,
    estimatedTime: "10-15 minutes",
    lastRun: "Never"
  }
];

const marketplaceWorkflows: MarketplaceWorkflow[] = [
  {
    id: "marketplace-1",
    name: "AWS Bedrock Multi-Agent Orchestrator",
    description: "Enterprise-grade multi-agent orchestration using AWS Bedrock for complex reasoning tasks",
    rating: 4.8,
    downloads: 1247,
    price: "$299/month",
    badge: "Marketplace",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Task Planning", icon: "file-text" },
      { id: "2", name: "Agent Selection", icon: "search" },
      { id: "3", name: "Parallel Execution", icon: "circle" },
      { id: "4", name: "Result Aggregation", icon: "database" }
    ]
  },
  {
    id: "marketplace-2",
    name: "Financial Document Analyzer Pro",
    description: "Advanced financial document analysis with compliance checking and fraud detection",
    rating: 4.6,
    downloads: 892,
    price: "$199/month",
    badge: "Marketplace",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Document Ingestion", icon: "upload" },
      { id: "2", name: "Financial Analysis", icon: "chart" },
      { id: "3", name: "Compliance Check", icon: "search" },
      { id: "4", name: "Risk Assessment", icon: "circle" }
    ]
  },
  {
    id: "marketplace-3",
    name: "Healthcare NLP Suite",
    description: "HIPAA-compliant medical document processing and clinical decision support",
    rating: 4.9,
    downloads: 567,
    price: "$499/month",
    badge: "Marketplace",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Document Processing", icon: "file-text" },
      { id: "2", name: "Medical Entity Extraction", icon: "search" },
      { id: "3", name: "Clinical Coding", icon: "tag" },
      { id: "4", name: "Report Generation", icon: "file-text" }
    ]
  },
  {
    id: "marketplace-4",
    name: "Legal Contract Intelligence",
    description: "AI-powered contract analysis, clause extraction, and risk identification",
    rating: 4.7,
    downloads: 423,
    price: "$399/month",
    badge: "Marketplace",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Contract Upload", icon: "upload" },
      { id: "2", name: "Clause Extraction", icon: "search" },
      { id: "3", name: "Risk Analysis", icon: "chart" },
      { id: "4", name: "Compliance Review", icon: "circle" }
    ]
  },
  {
    id: "marketplace-5",
    name: "E-commerce Recommendation Engine",
    description: "Personalized product recommendations using collaborative filtering and deep learning",
    rating: 4.5,
    downloads: 1089,
    price: "$149/month",
    badge: "Marketplace",
    stepsCount: 4,
    steps: [
      { id: "1", name: "User Behavior Analysis", icon: "search" },
      { id: "2", name: "Product Matching", icon: "tag" },
      { id: "3", name: "Personalization", icon: "circle" },
      { id: "4", name: "Ranking", icon: "chart" }
    ]
  }
];

const builtInWorkflows: WorkflowData[] = [
  {
    id: "builtin-1",
    name: "Data Processing & Analysis",
    description: "Standard workflow for ingesting, processing, and analyzing structured and unstructured data",
    status: "active",
    createdBy: "AWS",
    createdAt: "2024-01-01",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Data Ingestion", icon: "download" },
      { id: "2", name: "Data Cleaning", icon: "filter" },
      { id: "3", name: "Analysis", icon: "chart" },
      { id: "4", name: "Visualization", icon: "pie-chart" }
    ],
    executions: 0,
    successRate: 0,
    estimatedTime: "5-10 minutes",
    lastRun: "Never"
  },
  {
    id: "builtin-2",
    name: "Document Understanding",
    description: "Extract insights from documents using OCR, NLP, and entity recognition",
    status: "active",
    createdBy: "AWS",
    createdAt: "2024-01-01",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Document Upload", icon: "upload" },
      { id: "2", name: "OCR Processing", icon: "scan" },
      { id: "3", name: "Entity Extraction", icon: "search" },
      { id: "4", name: "Classification", icon: "tag" }
    ],
    executions: 0,
    successRate: 0,
    estimatedTime: "2-4 minutes",
    lastRun: "Never"
  },
  {
    id: "builtin-3",
    name: "Conversational AI Assistant",
    description: "Multi-turn conversational agent with context awareness and memory",
    status: "active",
    createdBy: "AWS",
    createdAt: "2024-01-01",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Input Processing", icon: "message" },
      { id: "2", name: "Intent Recognition", icon: "search" },
      { id: "3", name: "Context Management", icon: "database" },
      { id: "4", name: "Response Generation", icon: "message-square" }
    ],
    executions: 0,
    successRate: 0,
    estimatedTime: "< 1 minute",
    lastRun: "Never"
  },
  {
    id: "builtin-4",
    name: "Code Generation & Review",
    description: "Generate, review, and optimize code based on requirements and best practices",
    status: "active",
    createdBy: "AWS",
    createdAt: "2024-01-01",
    stepsCount: 4,
    steps: [
      { id: "1", name: "Requirements Analysis", icon: "search" },
      { id: "2", name: "Code Generation", icon: "file-text" },
      { id: "3", name: "Code Review", icon: "search" },
      { id: "4", name: "Testing", icon: "circle" }
    ],
    executions: 0,
    successRate: 0,
    estimatedTime: "5-15 minutes",
    lastRun: "Never"
  }
];

const categories = [
  "All Categories",
  "Procurement",
  "Utilities",
  "Finance",
  "Support",
  "Marketing",
  "Analytics"
];

export function AgentBlueprints() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("my-blueprints");

  // Icon mapping function
  const getStepIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'download': Download,
      'filter': Filter,
      'chart': BarChart3,
      'pie-chart': PieChart,
      'upload': Upload,
      'scan': ScanLine,
      'search': Search,
      'tag': Tag,
      'message': MessageSquare,
      'database': Database,
      'message-square': MessageSquare,
      'file-text': FileText
    };
    return iconMap[iconName] || Circle;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', overflowX: 'hidden', margin:"15px" }}>
      {/* AWS Header Banner - Placeholder */}
      {/* <div style={{
        background: 'linear-gradient(90deg, #8B4513 0%, #1a365d 100%)',
        padding: '20px 24px',
        marginBottom: '16px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <img src="/aws-logo.svg" alt="AWS" style={{ height: '24px' }} />
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#ff9900', margin: 0 }}>
              AWS Agentic AI Factory
            </h1>
          </div>
          <p style={{ color: '#ffa500', fontSize: '12px', margin: 0 }}>
            Enterprise-grade platform for building, deploying, and managing intelligent AI agentic systems at scale
          </p>
        </div>
      </div> */}
      <AwsBanner></AwsBanner>

      {/* Main Content */}
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 24px', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>
                Agent Blueprints
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>
                Design, deploy, and manage automated AI workflows (workflows represent multi-agent orchestration to deliver an outcome)
              </p>
            </div>
            <Button
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              + Create Blueprint
            </Button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #2a2a2a', marginBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('built-in')}
              style={{
                padding: '8px 12px',
                backgroundColor: activeTab === 'built-in' ? '#2a2a2a' : 'transparent',
                color: activeTab === 'built-in' ? '#ffffff' : '#9ca3af',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              Built-in Workflows
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              style={{
                padding: '8px 12px',
                backgroundColor: activeTab === 'marketplace' ? '#2a2a2a' : 'transparent',
                color: activeTab === 'marketplace' ? '#ffffff' : '#9ca3af',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              AWS AI Marketplace
            </button>
            <button
              onClick={() => setActiveTab('my-blueprints')}
              style={{
                padding: '8px 12px',
                backgroundColor: activeTab === 'my-blueprints' ? '#2a2a2a' : 'transparent',
                color: activeTab === 'my-blueprints' ? '#ffffff' : '#9ca3af',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              My Blueprints
            </button>
          </div>

          {/* Search and Filters */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <Search style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '14px',
                color: '#6b7280'
              }} />
              <Input
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: '34px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  color: '#ffffff',
                  borderRadius: '4px',
                  height: '32px',
                  fontSize: '12px'
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '100%' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: selectedCategory === category ? '#ffffff' : '#1a1a1a',
                    color: selectedCategory === category ? '#000000' : '#ffffff',
                    border: '1px solid #2a2a2a',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Built-in Workflows Tab Content */}
        {activeTab === 'built-in' && (
          <>
            {/* Purple Banner */}
            <div style={{
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.8)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Workflow className="h-5 w-5" style={{ color: '#9333ea', marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#e9d5ff', margin: '0 0 4px 0' }}>
                    Built-in Workflows
                  </h3>
                  <p style={{ fontSize: '13px', color: '#d8b4fe', margin: 0, lineHeight: '1.5' }}>
                    Pre-configured workflows optimized for common AI use cases. Deploy instantly or customize to your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Built-in Workflow Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%', overflowX: 'hidden' }}>
              {builtInWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '100%',
                    overflowX: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                        {workflow.name}
                      </h3>
                      <span style={{
                        backgroundColor: '#8b5cf6',
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        Built-in
                      </span>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                      {workflow.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
                      <span>{workflow.stepsCount} steps</span>
                      <span>•</span>
                      <span>{workflow.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', marginBottom: '10px' }}>
                      Workflow Steps
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap'
                    }}>
                      {workflow.steps.map((step, index) => {
                        const StepIcon = getStepIcon(step.icon);
                        return (
                          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: '#1a1a1a',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: '1px solid #2a2a2a'
                            }}>
                              <StepIcon className="h-3 w-3" style={{ color: '#ffffff', flexShrink: 0 }} />
                              <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>{step.name}</span>
                            </div>
                            {index < workflow.steps.length - 1 && (
                              <ArrowRight className="h-3 w-3" style={{ color: '#6b7280', flexShrink: 0 }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#000000',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      <Download className="h-3 w-3" />
                      Use Template
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid #2a2a2a',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      <Copy className="h-3 w-3" />
                      Clone & Customize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* AWS AI Marketplace Tab Content */}
        {activeTab === 'marketplace' && (
          <>
            {/* Orange Banner */}
            <div style={{
              backgroundColor: 'rgba(234, 88, 12, 0.2)',
              border: '1px solid rgba(234, 88, 12, 0.8)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShoppingCart className="h-5 w-5" style={{ color: '#ea580c', marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#fed7aa', margin: '0 0 4px 0' }}>
                    AWS AI Marketplace
                  </h3>
                  <p style={{ fontSize: '13px', color: '#fdba74', margin: 0, lineHeight: '1.5' }}>
                    Premium workflows from AWS partners and verified developers. Enterprise-grade solutions for specialized use cases.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketplace Workflow Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%', overflowX: 'hidden' }}>
              {marketplaceWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '100%',
                    overflowX: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                        {workflow.name}
                      </h3>
                      <span style={{
                        backgroundColor: '#f97316',
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        {workflow.badge}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star className="h-3 w-3" style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>{workflow.rating}</span>
                      </div>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                      {workflow.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
                      <span>{workflow.downloads} downloads</span>
                      <span>•</span>
                      <span>{workflow.stepsCount} steps</span>
                      <span>•</span>
                      <span style={{ color: '#f97316', fontWeight: 600 }}>{workflow.price}</span>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', marginBottom: '10px' }}>
                      Workflow Steps
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap'
                    }}>
                      {workflow.steps.map((step, index) => {
                        const StepIcon = getStepIcon(step.icon);
                        return (
                          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: '#1a1a1a',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: '1px solid #2a2a2a'
                            }}>
                              <StepIcon className="h-3 w-3" style={{ color: '#ffffff', flexShrink: 0 }} />
                              <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>{step.name}</span>
                            </div>
                            {index < workflow.steps.length - 1 && (
                              <ArrowRight className="h-3 w-3" style={{ color: '#6b7280', flexShrink: 0 }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: '#f97316',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      <ShoppingCart className="h-3 w-3" />
                      Subscribe
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid #2a2a2a',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      View Details
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid #2a2a2a',
                      borderRadius: '6px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      Try Free Trial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* My Blueprints Tab Content */}
        {activeTab === 'my-blueprints' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '100%', overflowX: 'hidden' }}>
            {workflows.map((workflow) => (
            <div
              key={workflow.id}
              style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #2a2a2a',
                borderRadius: '6px',
                padding: '16px',
                maxWidth: '100%',
                overflowX: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                      {workflow.name}
                    </h3>
                    <span style={{
                      backgroundColor: workflow.status === 'active' ? '#10b981' : '#f59e0b',
                      color: '#000000',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '9px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {workflow.status}
                    </span>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '11px', margin: '0 0 6px 0', lineHeight: '1.4' }}>
                    {workflow.description}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#6b7280' }}>
                    <span>Created by {workflow.createdBy}</span>
                    <span>•</span>
                    <span>{workflow.createdAt}</span>
                    <span>•</span>
                    <span>{workflow.stepsCount} steps</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '3px'
                  }}>
                    <Edit className="h-3 w-3" />
                  </button>
                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '3px'
                  }}>
                    <Copy className="h-3 w-3" />
                  </button>
                  <button style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '3px'
                  }}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Workflow Steps */}
              <div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                  Workflow Steps
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '6px',
                  maxWidth: '100%'
                }}>
                  {workflow.steps.slice(0, 8).map((step, index) => (
                    <div key={step.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#1a1a1a',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #2a2a2a',
                      overflow: 'hidden'
                    }}>
                      <span style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontSize: '10px',
                        color: '#ffffff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                  {workflow.steps.length > 8 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#1a1a1a',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #2a2a2a',
                      fontSize: '10px',
                      color: '#6b7280'
                    }}>
                      +{workflow.steps.length - 8} more
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                padding: '10px 0',
                borderTop: '1px solid #2a2a2a',
                borderBottom: '1px solid #2a2a2a',
                marginBottom: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    {workflow.executions}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>Executions</div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    {workflow.successRate}%
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>Success Rate</div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    {workflow.estimatedTime}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>Est. Time</div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                    {workflow.lastRun}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>Last Run</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 500
                }}>
                  {workflow.status === 'draft' ? (
                    <>
                      <Play className="h-3 w-3" />
                      Start
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3" />
                      Pause
                    </>
                  )}
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 500
                }}>
                  <BarChart3 className="h-3 w-3" />
                  Analytics
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 500
                }}>
                  <Settings className="h-3 w-3" />
                  Configure
                </button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
  Edit
} from "lucide-react";

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', overflowX: 'hidden' }}>
      {/* AWS Header Banner - Placeholder */}
      <div style={{
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
      </div>

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

        {/* Workflow Cards */}
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
                      backgroundColor: '#10b981',
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
                  <Pause className="h-3 w-3" />
                  Pause
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
      </div>
    </div>
  );
}

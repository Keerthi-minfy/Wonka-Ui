
import { useState, useRef, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bot,
  Workflow,
  Wrench,
  Database,
  Shield,
  Plus,
  Trash2,
  Save,
  Download,
  Settings,
  Play,
  Zap,
  GitBranch,
  ArrowRight,
  Code,
  Link
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

// Item types for drag and drop
const ItemTypes = {
  AGENT: "agent",
  BLUEPRINT: "blueprint",
  TOOL: "tool",
  DATASTORE: "datastore",
  SECURITY: "security"
};

interface CanvasItem {
  id: string;
  type: string;
  name: string;
  category: string;
  position: { x: number; y: number };
  icon?: any;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface DraggableSourceItemProps {
  item: {
    id: string;
    name: string;
    category: string;
    type: string;
    description?: string;
  };
  itemType: string;
}

// Draggable source items from the library
function DraggableSourceItem({ item, itemType }: DraggableSourceItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemType,
    item: { ...item, itemType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    switch (itemType) {
      case ItemTypes.AGENT:
        return Bot;
      case ItemTypes.BLUEPRINT:
        return Workflow;
      case ItemTypes.TOOL:
        return Wrench;
      case ItemTypes.DATASTORE:
        return Database;
      case ItemTypes.SECURITY:
        return Shield;
      default:
        return Bot;
    }
  };

  const Icon = getIcon();

  return (
    <div
      ref={drag}
      className={`cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        padding: '12px 14px',
        backgroundColor: 'transparent',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        marginBottom: '10px'
      }}
      title={`Drag to add ${item.name}`}
    >
      <div className="flex items-start gap-3">
        <div style={{
          padding: '5px',
          backgroundColor: '#2a2a2a',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '24px',
          height: '24px'
        }}>
          <Icon className="h-4 w-4" style={{ color: '#ffffff' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate" style={{ color: '#ffffff' }}>{item.name}</div>
          {item.description && (
            <div className="text-xs truncate" style={{ color: '#9ca3af', marginTop: '2px' }}>
              {item.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Canvas item that can be dropped
function CanvasItemComponent({ 
  item, 
  onRemove,
  onMove,
  onConnect,
  onDropOnItem,
  isConnecting,
  selectedForConnection
}: { 
  item: CanvasItem; 
  onRemove: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onConnect: (id: string) => void;
  onDropOnItem: (sourceId: string, targetId: string) => void;
  isConnecting: boolean;
  selectedForConnection: string | null;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CANVAS_ITEM",
    item: { id: item.id, isCanvasItem: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Make the item a drop target for other canvas items
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "CANVAS_ITEM",
    drop: (draggedItem: any) => {
      // Don't drop on itself
      if (draggedItem.id !== item.id && draggedItem.isCanvasItem) {
        onDropOnItem(draggedItem.id, item.id);
      }
      return { dropped: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [item.id, onDropOnItem]);

  // Combine drag and drop refs
  const combineRefs = (el: HTMLDivElement | null) => {
    drag(el);
    drop(el);
  };

  const getIcon = () => {
    switch (item.type) {
      case ItemTypes.AGENT:
        return Bot;
      case ItemTypes.BLUEPRINT:
        return Workflow;
      case ItemTypes.TOOL:
        return Wrench;
      case ItemTypes.DATASTORE:
        return Database;
      case ItemTypes.SECURITY:
        return Shield;
      default:
        return Bot;
    }
  };

  const getColor = () => {
    switch (item.type) {
      case ItemTypes.AGENT:
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case ItemTypes.BLUEPRINT:
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      case ItemTypes.TOOL:
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case ItemTypes.DATASTORE:
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
      case ItemTypes.SECURITY:
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800";
    }
  };

  const Icon = getIcon();
  const isSelected = selectedForConnection === item.id;
  const showDropIndicator = isOver && canDrop && !isDragging;

  return (
    <div
      ref={combineRefs}
      className={`absolute p-3 rounded-lg border-2 ${getColor()} cursor-move transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""} ${
        showDropIndicator ? "ring-4 ring-green-500 ring-offset-2 scale-105 shadow-lg" : ""
      }`}
      style={{ left: item.position.x, top: item.position.y, minWidth: "160px" }}
      data-item-id={item.id}
    >
      <div className="flex items-start gap-2">
        <Icon className="h-4 w-4 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{item.name}</div>
          <div className="text-xs opacity-70 mt-0.5">{item.category}</div>
          {showDropIndicator && (
            <div className="text-xs font-medium text-green-600 dark:text-green-400 mt-1 animate-pulse">
              Drop to connect →
            </div>
          )}
        </div>
        <div className="flex gap-1">
          {isConnecting && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-white/50 dark:hover:bg-black/50"
              onClick={(e) => {
                e.stopPropagation();
                onConnect(item.id);
              }}
            >
              <Link className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-white/50 dark:hover:bg-black/50"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// SVG Line connector
function ConnectionLine({ 
  from, 
  to, 
  canvasItems, 
  onRemove 
}: { 
  from: string; 
  to: string; 
  canvasItems: CanvasItem[];
  onRemove: (from: string, to: string) => void;
}) {
  const fromItem = canvasItems.find(item => item.id === from);
  const toItem = canvasItems.find(item => item.id === to);

  if (!fromItem || !toItem) return null;

  const fromX = fromItem.position.x + 80;
  const fromY = fromItem.position.y + 30;
  const toX = toItem.position.x + 80;
  const toY = toItem.position.y + 30;

  // Calculate midpoint for the delete button
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  // Create curved path for flowchart-like appearance
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Control points for bezier curve
  const controlX1 = fromX + dx * 0.3;
  const controlY1 = fromY;
  const controlX2 = toX - dx * 0.3;
  const controlY2 = toY;
  
  const pathD = `M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`;
  
  // Calculate angle for label rotation
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

  return (
    <g className="connection-group">
      <defs>
        <marker
          id={`arrowhead-${from}-${to}`}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 12 3, 0 6" fill="#6366f1" className="dark:fill-blue-400" />
        </marker>
      </defs>
      {/* Shadow path for depth */}
      <path
        d={pathD}
        stroke="#000000"
        strokeWidth="4"
        opacity="0.1"
        fill="none"
        markerEnd={`url(#arrowhead-${from}-${to})`}
        className="connection-line-shadow"
      />
      {/* Main connection path */}
      <path
        d={pathD}
        stroke="#6366f1"
        strokeWidth="3"
        fill="none"
        markerEnd={`url(#arrowhead-${from}-${to})`}
        className="connection-line dark:stroke-blue-400"
      />
      {/* Invisible wider path for easier hovering */}
      <path
        d={pathD}
        stroke="transparent"
        strokeWidth="20"
        fill="none"
        className="hover:stroke-blue-200/20 cursor-pointer"
        onClick={() => onRemove(from, to)}
      />
      {/* Delete button circle */}
      <circle
        cx={midX}
        cy={midY}
        r="14"
        fill="white"
        stroke="#6366f1"
        strokeWidth="2"
        className="cursor-pointer hover:fill-red-100 hover:stroke-red-500 pointer-events-auto transition-colors dark:fill-gray-800 dark:stroke-blue-400"
        onClick={() => onRemove(from, to)}
      />
      {/* X icon in the circle */}
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#6366f1"
        fontSize="14"
        fontWeight="bold"
        className="cursor-pointer pointer-events-none hover:fill-red-500 dark:fill-blue-400"
      >
        ×
      </text>
    </g>
  );
}

// Drop zone canvas
function Canvas({ 
  items, 
  connections,
  onDrop,
  onRemove,
  onMove,
  onConnect,
  onDropOnItem,
  onRemoveConnection,
  isConnecting,
  selectedForConnection
}: { 
  items: CanvasItem[];
  connections: Connection[];
  onDrop: (item: any, monitor: any) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onConnect: (id: string) => void;
  onDropOnItem: (sourceId: string, targetId: string) => void;
  onRemoveConnection: (from: string, to: string) => void;
  isConnecting: boolean;
  selectedForConnection: string | null;
}) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [
      ItemTypes.AGENT,
      ItemTypes.BLUEPRINT,
      ItemTypes.TOOL,
      ItemTypes.DATASTORE,
      ItemTypes.SECURITY,
      "CANVAS_ITEM"
    ],
    drop: (item, monitor) => {
      // Only handle drops directly on the canvas (not on nested elements)
      if (!monitor.didDrop()) {
        onDrop(item, monitor);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }), [onDrop]);

  const dropZoneClass = isOver && canDrop 
    ? "border-primary bg-primary/5" 
    : canDrop 
    ? "border-primary/50" 
    : "border-muted-foreground/20";

  return (
    <div
      ref={drop}
      data-canvas="blueprint-canvas"
      className={`relative w-full h-full min-h-[600px] rounded-lg border-2 border-dashed p-4 transition-colors ${dropZoneClass}`}
      style={{ backgroundColor: '#1a1a1a', borderColor: '#3a3a3a' }}
    >
      {/* SVG Layer for connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
        <g style={{ pointerEvents: 'auto' }}>
          {connections.map((conn) => (
            <ConnectionLine
              key={conn.id}
              from={conn.from}
              to={conn.to}
              canvasItems={items}
              onRemove={onRemoveConnection}
            />
          ))}
        </g>
      </svg>

      {items.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-lg">
            <Zap className="h-12 w-12 mx-auto mb-4" style={{ color: '#6b7280', opacity: 0.5 }} />
            <p className="font-medium text-lg mb-2" style={{ color: '#d1d5db' }}>Drag and drop items here to build your blueprint</p>
            <p className="text-sm mt-2 mb-4" style={{ color: '#9ca3af' }}>
              Combine agents, blueprints, tools, data stores, and security components
            </p>
            <div className="p-4 rounded-lg text-sm text-left" style={{ backgroundColor: 'rgba(30, 58, 138, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <div>
                <p className="font-medium mb-3" style={{ color: '#93c5fd' }}>💡 Tips:</p>
                <div style={{ color: '#93c5fd', lineHeight: '1.8' }}>
                  <div style={{ marginBottom: '4px' }}>• Drag the same component multiple times to create multiple instances</div>
                  <div style={{ marginBottom: '4px' }}>• Drop one item onto another to automatically connect them</div>
                  <div>• Click "Connect Items" to manually link components with flowchart lines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      {items.map((item) => (
        <CanvasItemComponent
          key={item.id}
          item={item}
          onRemove={onRemove}
          onMove={onMove}
          onConnect={onConnect}
          onDropOnItem={onDropOnItem}
          isConnecting={isConnecting}
          selectedForConnection={selectedForConnection}
        />
      ))}
    </div>
  );
}

// Generate code based on canvas items and connections
function generateBlueprintCode(items: CanvasItem[], connections: Connection[]): string {
  const itemsByType = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, CanvasItem[]>);

  let code = `// Blueprint Studio - Generated Workflow
// Generated on ${new Date().toLocaleString()}

interface BlueprintConfig {
  name: string;
  description: string;
  components: Component[];
  connections: Connection[];
}

interface Component {
  id: string;
  type: string;
  name: string;
  category: string;
  config?: any;
}

interface Connection {
  from: string;
  to: string;
}

const blueprint: BlueprintConfig = {
  name: "Custom Blueprint",
  description: "Blueprint created in Blueprint Studio",
  components: [
`;

  items.forEach((item, index) => {
    code += `    {
      id: "${item.id}",
      type: "${item.type}",
      name: "${item.name}",
      category: "${item.category}",
      config: {}
    }${index < items.length - 1 ? ',' : ''}
`;
  });

  code += `  ],
  connections: [
`;

  connections.forEach((conn, index) => {
    code += `    { from: "${conn.from}", to: "${conn.to}" }${index < connections.length - 1 ? ',' : ''}
`;
  });

  code += `  ]
};

// Execution flow
async function executeBlueprintWorkflow() {
  console.log("Starting blueprint execution...");
  
`;

  // Group by type
  if (itemsByType[ItemTypes.AGENT]) {
    code += `  // Initialize Agents\n`;
    itemsByType[ItemTypes.AGENT].forEach(item => {
      code += `  const ${item.id.replace(/-/g, '_')} = await initializeAgent("${item.name}");\n`;
    });
    code += '\n';
  }

  if (itemsByType[ItemTypes.DATASTORE]) {
    code += `  // Connect Data Stores\n`;
    itemsByType[ItemTypes.DATASTORE].forEach(item => {
      code += `  const ${item.id.replace(/-/g, '_')} = await connectDataStore("${item.name}");\n`;
    });
    code += '\n';
  }

  if (itemsByType[ItemTypes.TOOL]) {
    code += `  // Initialize Tools\n`;
    itemsByType[ItemTypes.TOOL].forEach(item => {
      code += `  const ${item.id.replace(/-/g, '_')} = await initializeTool("${item.name}");\n`;
    });
    code += '\n';
  }

  if (itemsByType[ItemTypes.SECURITY]) {
    code += `  // Apply Security Components\n`;
    itemsByType[ItemTypes.SECURITY].forEach(item => {
      code += `  await applySecurity("${item.name}");\n`;
    });
    code += '\n';
  }

  code += `  // Execute workflow based on connections
  console.log("Workflow execution complete");
}

// Export for use in other modules
export { blueprint, executeBlueprintWorkflow };
`;

  return code;
}

export function BlueprintStudio() {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [itemCounter, setItemCounter] = useState(0);
  const [connectionCounter, setConnectionCounter] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedForConnection, setSelectedForConnection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("canvas");

  // Comprehensive library items from the system
  const agents = [
    { id: "agent-1", name: "Data Analyst AI", category: "Analytics", type: ItemTypes.AGENT, description: "Advanced data analysis and visualization" },
    { id: "agent-2", name: "UI Designer AI", category: "Design", type: ItemTypes.AGENT, description: "Creates modern UI designs and prototypes" },
    { id: "agent-3", name: "Code Generator AI", category: "Development", type: ItemTypes.AGENT, description: "Generate production-ready code" },
    { id: "agent-4", name: "NLP Processor", category: "NLP", type: ItemTypes.AGENT, description: "Natural language processing" },
    { id: "agent-5", name: "Image Processor AI", category: "Vision", type: ItemTypes.AGENT, description: "Image processing and generation" },
    { id: "agent-6", name: "Business Analyst AI", category: "Business", type: ItemTypes.AGENT, description: "Business process analysis" },
    { id: "agent-7", name: "Custom CRM Agent", category: "Business", type: ItemTypes.AGENT, description: "Customer relationship management" },
    { id: "agent-8", name: "AWS Comprehend Agent", category: "NLP", type: ItemTypes.AGENT, description: "AWS-powered NLP" },
    { id: "agent-9", name: "Custom Security Agent", category: "Security", type: ItemTypes.AGENT, description: "Security monitoring and threat detection" },
  ];

  const blueprints = [
    { id: "bp-1", name: "Procurement Process Workflow", category: "Procurement", type: ItemTypes.BLUEPRINT, description: "End-to-end procurement workflow" },
    { id: "bp-2", name: "Smart Grid Outage Detection", category: "Utilities", type: ItemTypes.BLUEPRINT, description: "Automated outage detection & resolution" },
    { id: "bp-3", name: "Investment Research", category: "Finance", type: ItemTypes.BLUEPRINT, description: "Comprehensive investment analysis" },
    { id: "bp-4", name: "Dynamic Pricing", category: "Ecommerce", type: ItemTypes.BLUEPRINT, description: "Real-time pricing optimization" },
    { id: "bp-5", name: "Billing Automation", category: "Finance", type: ItemTypes.BLUEPRINT, description: "Automated billing process" },
    { id: "bp-6", name: "Invoice Processing Pipeline", category: "Finance", type: ItemTypes.BLUEPRINT, description: "Automated invoice processing" },
    { id: "bp-7", name: "Customer Support Triage", category: "Support", type: ItemTypes.BLUEPRINT, description: "Automated ticket categorization" },
  ];

  const tools = [
    { id: "tool-1", name: "Atlassian Rovo Agent", category: "Productivity", type: ItemTypes.TOOL, description: "Knowledge discovery and collaboration" },
    { id: "tool-2", name: "Jira Ticket Updates", category: "Productivity", type: ItemTypes.TOOL, description: "Create and manage Jira tickets" },
    { id: "tool-3", name: "Confluence Updates", category: "Productivity", type: ItemTypes.TOOL, description: "Update Confluence documentation" },
    { id: "tool-4", name: "Atlassian Rovo Comms Drafter", category: "Productivity", type: ItemTypes.TOOL, description: "Draft professional communications" },
    { id: "tool-5", name: "Atlassian Rovo OKRA Generator", category: "Productivity", type: ItemTypes.TOOL, description: "Generate OKRs and KRAs" },
    { id: "tool-6", name: "Atlassian Rovo Progress Tracker", category: "Productivity", type: ItemTypes.TOOL, description: "Track project progress" },
    { id: "tool-7", name: "Atlassian Rovo Jira Theme Analyser", category: "Productivity", type: ItemTypes.TOOL, description: "Analyze Jira themes and patterns" },
    { id: "tool-8", name: "Canva Deep Research", category: "Productivity", type: ItemTypes.TOOL, description: "AI-powered research tool" },
    { id: "tool-9", name: "Canva AI", category: "Vision", type: ItemTypes.TOOL, description: "AI-powered design assistant" },
    { id: "tool-10", name: "Pinecone Vector DB", category: "Database", type: ItemTypes.TOOL, description: "Vector database for AI apps" },
    { id: "tool-11", name: "Claude Code", category: "Development", type: ItemTypes.TOOL, description: "Advanced code analysis and generation" },
  ];

  const dataStores = [
    { id: "ds-1", name: "Customer Knowledge Base", category: "Knowledge Base", type: ItemTypes.DATASTORE, description: "Customer support documentation" },
    { id: "ds-2", name: "Sales Analytics DB", category: "Database", type: ItemTypes.DATASTORE, description: "PostgreSQL sales database" },
    { id: "ds-3", name: "Data Lake", category: "Lake House", type: ItemTypes.DATASTORE, description: "Centralized analytics data lake" },
    { id: "ds-4", name: "Document Storage", category: "S3", type: ItemTypes.DATASTORE, description: "S3 bucket for documents" },
    { id: "ds-5", name: "API Documentation", category: "Documentation", type: ItemTypes.DATASTORE, description: "Technical API references" },
    { id: "ds-6", name: "Social Media Feed", category: "Social Media", type: ItemTypes.DATASTORE, description: "Social media mentions data" },
    { id: "ds-7", name: "ML Training Dataset", category: "ML Data", type: ItemTypes.DATASTORE, description: "Labeled training datasets" },
    { id: "ds-8", name: "Short-term Memory", category: "Memory", type: ItemTypes.DATASTORE, description: "Redis cache for sessions" },
    { id: "ds-9", name: "Confluence", category: "Documentation", type: ItemTypes.DATASTORE, description: "Atlassian Confluence workspace" },
  ];

  const securityComponents = [
    { id: "sec-1", name: "Authentication", category: "Access Control", type: ItemTypes.SECURITY, description: "User authentication" },
    { id: "sec-2", name: "Data Encryption", category: "Encryption", type: ItemTypes.SECURITY, description: "Encrypt sensitive data" },
    { id: "sec-3", name: "Audit Logger", category: "Compliance", type: ItemTypes.SECURITY, description: "Track all actions" },
    { id: "sec-4", name: "Rate Limiter", category: "Protection", type: ItemTypes.SECURITY, description: "Prevent abuse" },
    { id: "sec-5", name: "OAuth2 Provider", category: "Access Control", type: ItemTypes.SECURITY, description: "OAuth2 authentication" },
    { id: "sec-6", name: "API Key Management", category: "Access Control", type: ItemTypes.SECURITY, description: "Manage API keys securely" },
  ];

  const handleDrop = useCallback((item: any, monitor: any) => {
    const offset = monitor.getClientOffset();
    
    if (!offset) return;

    // Find the canvas element
    const canvasElement = document.querySelector('[data-canvas="blueprint-canvas"]');
    if (!canvasElement) return;
    
    const canvasRect = canvasElement.getBoundingClientRect();
    const x = offset.x - canvasRect.left - 80;
    const y = offset.y - canvasRect.top - 20;

    if (item.itemType) {
      // New item from library - create a new instance
      setItemCounter(prevCounter => {
        const newItem: CanvasItem = {
          id: `canvas-item-${prevCounter}`,
          type: item.itemType,
          name: item.name,
          category: item.category,
          position: { x, y }
        };
        setCanvasItems(prev => [...prev, newItem]);
        return prevCounter + 1;
      });
    } else {
      // Existing canvas item being moved
      setCanvasItems(prev => prev.map(i => 
        i.id === item.id 
          ? { ...i, position: { x, y } }
          : i
      ));
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id));
    // Remove connections involving this item
    setConnections(prev => prev.filter(conn => conn.from !== id && conn.to !== id));
  }, []);

  const handleMove = useCallback((id: string, x: number, y: number) => {
    setCanvasItems(prev => prev.map(item => 
      item.id === id ? { ...item, position: { x, y } } : item
    ));
  }, []);

  const handleConnect = useCallback((id: string) => {
    setSelectedForConnection(prev => {
      if (prev === null) {
        // First selection
        return id;
      } else if (prev === id) {
        // Deselect if clicking the same item
        return null;
      } else {
        // Second selection - create connection
        setConnectionCounter(counter => {
          const newConnection: Connection = {
            id: `conn-${counter}`,
            from: prev,
            to: id
          };
          setConnections(connections => [...connections, newConnection]);
          return counter + 1;
        });
        return null;
      }
    });
  }, []);

  const handleDropOnItem = useCallback((sourceId: string, targetId: string) => {
    // Check if connection already exists
    setConnections(prev => {
      const exists = prev.some(conn => conn.from === sourceId && conn.to === targetId);
      if (exists) {
        // Connection already exists, don't create duplicate
        return prev;
      }
      
      // Create new connection
      setConnectionCounter(counter => {
        const newConnection: Connection = {
          id: `conn-${counter}`,
          from: sourceId,
          to: targetId
        };
        setConnections(connections => [...connections, newConnection]);
        return counter + 1;
      });
      
      return prev;
    });
  }, []);

  const handleClear = () => {
    setCanvasItems([]);
    setConnections([]);
    setItemCounter(0);
    setConnectionCounter(0);
    setSelectedForConnection(null);
    setIsConnecting(false);
  };

  const handleSave = () => {
    console.log("Saving blueprint:", { items: canvasItems, connections });
    // Here you would implement the save logic
  };

  const toggleConnectMode = () => {
    setIsConnecting(!isConnecting);
    setSelectedForConnection(null);
  };

  const handleRemoveConnection = useCallback((from: string, to: string) => {
    setConnections(prev => prev.filter(conn => !(conn.from === from && conn.to === to)));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6" style={{margin:"15px"}}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Blueprint Studio</h1>
            <p className="text-sm mt-1" style={{ color: '#8b8b8b' }}>
              Build custom agent blueprints by dragging and dropping components
            </p>
          </div>
          <div className="flex items-center gap-3">
            {canvasItems.length > 0 && (
              <div className="flex items-center gap-3 mr-2 px-3 py-1 rounded-lg" style={{backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a'}}>
                <div className="flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5" style={{ color: '#8b8b8b' }} />
                  <span className="text-sm font-medium text-white">{canvasItems.length}</span>
                </div>
                <div className="h-4 w-px" style={{ backgroundColor: '#2a2a2a' }} />
                <div className="flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5" style={{ color: '#8b8b8b' }} />
                  <span className="text-sm font-medium text-white">{connections.length}</span>
                </div>
              </div>
            )}
            <button
              onClick={toggleConnectMode}
              className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
              style={{
                backgroundColor: isConnecting ? '#ffffff' : 'transparent',
                color: isConnecting ? '#000000' : '#ffffff',
                border: isConnecting ? 'none' : '1px solid #3a3a3a',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Link className="h-4 w-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Items"}</span>
            </button>
            <button
              onClick={handleClear}
              className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #3a3a3a',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Canvas</span>
            </button>
            <button
              className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #3a3a3a',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button
              onClick={handleSave}
              className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #3a3a3a',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Save className="h-4 w-4" />
              <span>Save Blueprint</span>
            </button>
            <button
              className="gap-2 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Play className="h-4 w-4" />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)'
          }}
        >
          <div className="flex items-start gap-3">
            <GitBranch className="h-5 w-5 mt-0.5" style={{ color: '#60a5fa' }} />
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-2" style={{ color: '#93c5fd' }}>Visual Blueprint Builder</h3>
              <div className="text-sm" style={{ color: '#93c5fd', lineHeight: '1.6' }}>
                <p className="mb-1">
                  <strong>Unlimited Drag & Drop:</strong> Grab any component from the right panel and drop it onto the canvas. You can drag the same component multiple times to add multiple instances.
                </p>
                <p className="mb-1">
                  <strong>Auto-Connect:</strong> Drop one canvas item onto another to automatically create a connection between them (like a flowchart).
                </p>
                <p>
                  <strong>Manual Connect:</strong> Click "Connect Items" button, then click the link icon on two items to create directional connections.
                  {isConnecting && <span className="font-semibold"> → CONNECTING MODE ACTIVE: Click link icons on items to connect them.</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{display:"flex"}}>
          {/* Canvas Area */}
          <div className="lg:col-span-3" style={{width:"70%"}}>
            <div className="rounded-lg" style={{ backgroundColor: '#000000', border: '1px solid #2a2a2a' }}>
              <div style={{ padding: '20px' }}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div
                    style={{
                      display: 'inline-flex',
                      backgroundColor: '#1a1a1a',
                      borderRadius: '6px',
                      padding: '3px',
                      gap: '2px'
                    }}
                  >
                    <button
                      onClick={() => setActiveTab('canvas')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500,
                        backgroundColor: activeTab === 'canvas' ? '#2a2a2a' : 'transparent',
                        color: activeTab === 'canvas' ? '#ffffff' : '#6b7280',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Zap className="h-4 w-4" />
                      <span>Canvas</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500,
                        backgroundColor: activeTab === 'code' ? '#2a2a2a' : 'transparent',
                        color: activeTab === 'code' ? '#ffffff' : '#6b7280',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Code className="h-4 w-4" />
                      <span>Live Code</span>
                    </button>
                  </div>
                </Tabs>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">
                      Blueprint Canvas
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: '#1a1a1a', color: '#6b7280' }}
                    >
                      {canvasItems.length} components
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ backgroundColor: '#1a1a1a', color: '#6b7280' }}
                    >
                      {connections.length} connections
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#9ca3af' }}>
                    Drop components here and arrange them to create your blueprint
                  </p>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                {activeTab === "canvas" ? (
                  <Canvas
                    items={canvasItems}
                    connections={connections}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onMove={handleMove}
                    onConnect={handleConnect}
                    onDropOnItem={handleDropOnItem}
                    onRemoveConnection={handleRemoveConnection}
                    isConnecting={isConnecting}
                    selectedForConnection={selectedForConnection}
                  />
                ) : (
                  <ScrollArea className="h-[600px] w-full rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #2a2a2a' }}>
                    <pre className="text-sm text-white">
                      <code>{generateBlueprintCode(canvasItems, connections)}</code>
                    </pre>
                  </ScrollArea>
                )}
              </div>
            </div>
          </div>

          {/* Component Library */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg" style={{ backgroundColor: '#000000', border: '1px solid #2a2a2a' }}>
              <div style={{ padding: '24px', paddingBottom: '20px' }}>
                <h3 className="text-lg font-semibold text-white mb-2">Component Library</h3>
                <p className="text-sm" style={{ color: '#9ca3af' }}>
                  Drag items multiple times to add instances to canvas
                </p>
              </div>
              <div>
                <Tabs defaultValue="agents" className="w-full">
                  <TabsList
                    className="w-full rounded-none h-auto p-0"
                    style={{
                      backgroundColor: 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0
                    }}
                  >
                    {/* First row - Agents and Blueprints */}
                    <div style={{ display: 'flex', width: '100%', backgroundColor: '#1a1a1a' }}>
                      <TabsTrigger
                        value="agents"
                        className="gap-2 rounded-none border-0 shadow-none"
                        style={{
                          fontSize: '13px',
                          padding: '12px 16px',
                          fontWeight: 500,
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Bot className="h-4 w-4" />
                        <span>Agents</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#3a3a3a', color: '#9ca3af' }}
                        >
                          {agents.length}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="blueprints"
                        className="gap-2 rounded-none border-0 shadow-none"
                        style={{
                          fontSize: '13px',
                          padding: '12px 16px',
                          fontWeight: 500,
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Workflow className="h-4 w-4" />
                        <span>Blueprints</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#3a3a3a', color: '#9ca3af' }}
                        >
                          {blueprints.length}
                        </span>
                      </TabsTrigger>
                    </div>

                    {/* Second row - Tools, Data, Security */}
                    <div style={{ display: 'flex', width: '100%', backgroundColor: '#1a1a1a' }}>
                      <TabsTrigger
                        value="tools"
                        className="gap-2 rounded-none border-0 shadow-none"
                        style={{
                          fontSize: '13px',
                          padding: '12px 16px',
                          fontWeight: 500,
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Wrench className="h-4 w-4" />
                        <span>Tools</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#3a3a3a', color: '#9ca3af' }}
                        >
                          {tools.length}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="data"
                        className="gap-2 rounded-none border-0 shadow-none"
                        style={{
                          fontSize: '13px',
                          padding: '12px 16px',
                          fontWeight: 500,
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Database className="h-4 w-4" />
                        <span>Data</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#3a3a3a', color: '#9ca3af' }}
                        >
                          {dataStores.length}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="security"
                        className="gap-2 rounded-none border-0 shadow-none"
                        style={{
                          fontSize: '13px',
                          padding: '12px 16px',
                          fontWeight: 500,
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Security</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#3a3a3a', color: '#9ca3af' }}
                        >
                          {securityComponents.length}
                        </span>
                      </TabsTrigger>
                    </div>
                  </TabsList>

                  <ScrollArea className="h-[500px]">
                    <TabsContent value="agents" className="mt-0" style={{ padding: '16px' }}>
                      {agents.map((agent) => (
                        <DraggableSourceItem
                          key={agent.id}
                          item={agent}
                          itemType={ItemTypes.AGENT}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="blueprints" className="mt-0" style={{ padding: '16px' }}>
                      {blueprints.map((blueprint) => (
                        <DraggableSourceItem
                          key={blueprint.id}
                          item={blueprint}
                          itemType={ItemTypes.BLUEPRINT}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="tools" className="mt-0" style={{ padding: '16px' }}>
                      {tools.map((tool) => (
                        <DraggableSourceItem
                          key={tool.id}
                          item={tool}
                          itemType={ItemTypes.TOOL}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="data" className="mt-0" style={{ padding: '16px' }}>
                      {dataStores.map((dataStore) => (
                        <DraggableSourceItem
                          key={dataStore.id}
                          item={dataStore}
                          itemType={ItemTypes.DATASTORE}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="security" className="mt-0" style={{ padding: '16px' }}>
                      {securityComponents.map((security) => (
                        <DraggableSourceItem
                          key={security.id}
                          item={security}
                          itemType={ItemTypes.SECURITY}
                        />
                      ))}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Guide */}
        <div className="rounded-lg" style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', padding: '32px' }}>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Quick Guide</h2>
          </div>

          <div style={{ display: 'flex', gap: '48px', marginBottom: '32px' }}>
            <div className="flex items-start gap-3" style={{ flex: '1' }}>
              <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot className="h-4 w-4" style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Agents</div>
                <div className="text-xs" style={{ color: '#a0a0a0', lineHeight: '1.5' }}>
                  AI processing units for analysis and automation
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3" style={{ flex: '1' }}>
              <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Workflow className="h-4 w-4" style={{ color: '#a855f7' }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Blueprints</div>
                <div className="text-xs" style={{ color: '#a0a0a0', lineHeight: '1.5' }}>
                  Pre-built workflow templates for common tasks
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3" style={{ flex: '1' }}>
              <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench className="h-4 w-4" style={{ color: '#22c55e' }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Tools</div>
                <div className="text-xs" style={{ color: '#a0a0a0', lineHeight: '1.5' }}>
                  Utilities and integrations for data processing
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3" style={{ flex: '1' }}>
              <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database className="h-4 w-4" style={{ color: '#f97316' }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Data Stores</div>
                <div className="text-xs" style={{ color: '#a0a0a0', lineHeight: '1.5' }}>
                  Storage solutions for blueprints data
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3" style={{ flex: '1' }}>
              <div style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield className="h-4 w-4" style={{ color: '#ef4444' }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Security</div>
                <div className="text-xs" style={{ color: '#a0a0a0', lineHeight: '1.5' }}>
                  Authentication, encryption, and compliance
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div style={{ flex: '1' }}>
                <div className="font-semibold mb-3 flex items-center gap-2 text-white text-sm">
                  <ArrowRight className="h-4 w-4" />
                  How to Build
                </div>
                <div className="space-y-1 text-xs" style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                  <div>1. Drag components from the right panel</div>
                  <div>2. Drop them onto the canvas</div>
                  <div>3. Arrange components as needed</div>
                </div>
              </div>

              <div style={{ flex: '1' }}>
                <div className="font-semibold mb-3 flex items-center gap-2 text-white text-sm">
                  <Link className="h-4 w-4" />
                  How to Connect
                </div>
                <div className="space-y-1 text-xs" style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                  <div>1. Click "Connect Items" button</div>
                  <div>2. Click link icon on first component</div>
                  <div>3. Click link icon on second component</div>
                </div>
              </div>

              <div style={{ flex: '1' }}>
                <div className="font-semibold mb-3 flex items-center gap-2 text-white text-sm">
                  <Code className="h-4 w-4" />
                  View Code
                </div>
                <div className="space-y-1 text-xs" style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                  <div>1. Switch to "Live Code" tab</div>
                  <div>2. See auto-generated blueprint code</div>
                  <div>3. Export or deploy your blueprint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}



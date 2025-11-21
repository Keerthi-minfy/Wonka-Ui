import { Heart, Download } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export interface AgentCardProps {
  title: string;
  description: string;
  version: string;
  capabilities: string[];
  likes?: number;
  downloads?: number;
  className?: string;
}

export function AgentCard({
  title,
  description,
  version,
  capabilities,
  likes = 0,
  downloads = 0,
  className,
}: AgentCardProps) {
  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-base mb-1 truncate">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">Version {version}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{likes}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[40px]">
          {description}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Capabilities:</p>
          <div className="flex flex-wrap gap-1.5">
            {capabilities.map((capability, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-accent hover:bg-accent/80"
              >
                {capability}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 flex items-center justify-between border-t border-border/50 mt-4">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Download className="h-4 w-4" />
          <span className="text-xs">{downloads.toLocaleString()}</span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            Details
          </Button>
          <Button size="sm" className="h-8 text-xs">
            Deploy
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

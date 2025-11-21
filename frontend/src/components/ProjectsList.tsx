import { Plus, FolderOpen, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Project } from '../services';

interface ProjectsListProps {
  projects: Project[];
  onCreateProject: () => void;
  onSelectProject: (project: Project) => void;
  loading?: boolean;
  error?: string | null;
}

export function ProjectsList({ projects, onCreateProject, onSelectProject, loading, error }: ProjectsListProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-foreground">Projects</h2>
              <p className="text-muted-foreground">Manage your agentic AI assessments</p>
            </div>
            <Button onClick={onCreateProject} className="gap-2" disabled={loading}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-foreground mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first project to begin an agentic AI assessment
                </p>
                <Button onClick={onCreateProject} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => onSelectProject(project)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-foreground">{project.name}</CardTitle>
                    <Badge
                      variant={project.status === 'completed' ? 'default' : 'secondary'}
                      className={project.status === 'completed' ? 'bg-primary' : ''}
                    >
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {project.progress.currentPhase || 'In Progress'}
                        </span>
                        <span className="font-medium text-foreground">
                          {Math.round(project.progress.overall)}%
                        </span>
                      </div>
                      <Progress value={project.progress.overall} className="h-2" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last modified: {formatDate(project.lastModified || project.updatedAt)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created: {formatDate(project.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}

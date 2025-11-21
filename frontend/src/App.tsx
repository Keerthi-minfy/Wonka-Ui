import { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Layout } from './components/Layout';
import { AppLayout } from './components/AppLayout';
import { AgentMarketplace } from './components/AgentMarketplace';
import { RequestPipeline } from './components/RequestPipeline';
import { Dashboard } from './components/Dashboard';
import { IntakeRequests } from './components/IntakeRequests';
import { AgentCatalog } from './components/AgentCatalog';
import { AgentBlueprints } from './components/AgentBlueprints';
import { BlueprintStudio } from './components/BlueprintStudio';
import { Integrations } from './components/Integrations';
import { Tools } from './components/Tools';
import { DataStores } from './components/DataStores';
import { Team } from './components/Team';
import { Security } from './components/Security';
import { DeployedApps } from './components/DeployedApps';
import { Alerts } from './components/Alerts';
import { AgentIteration } from './components/AgentIteration';
import { AgentFinOps } from './components/AgentFinOps';
import { AgentMonetization } from './components/AgentMonetization';
import { ProjectsList } from './components/ProjectsList';
import { CreateProject } from './components/CreateProject';
import { AssessmentChat } from './components/AssessmentChat';
import { ProjectDashboard } from './components/ProjectDashboard';
import { serverService, projectService, type Project } from './services';

type View =
  | 'auth'
  | 'projects'
  | 'create'
  | 'assessment'
  | 'project-dashboard'
  | 'marketplace'
  | 'dashboard'
  | 'intake-requests'
  | 'agent-catalog'
  | 'agent-blueprints'
  | 'blueprint-studio'
  | 'integrations'
  | 'tools'
  | 'data-stores'
  | 'team'
  | 'security'
  | 'deployed-apps'
  | 'alerts'
  | 'agent-iteration'
  | 'agent-finops'
  | 'agent-monetization';

function App() {
  const [view, setView] = useState<View>('auth');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState<string>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Load projects when user is authenticated and viewing projects
  useEffect(() => {
    if (currentUser && view === 'projects') {
      loadProjects();
    }
  }, [currentUser, view]);

  const checkAuthStatus = async () => {
    try {
      const user = await serverService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setView('dashboard');
        setActiveNavItem('dashboard');
      }
    } catch (error) {
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    setLoadingProjects(true);
    setError(null);
    
    try {
      const projectsList = await projectService.listProjects();
      setProjects(projectsList);
    } catch (err: any) {
      console.error('Failed to load projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setView('dashboard');
    setActiveNavItem('dashboard');
  };

  const handleLogout = async () => {
    try {
      await serverService.signOut();
      setCurrentUser(null);
      setView('auth');
      setSelectedProject(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateProject = () => {
    setView('create');
  };

  const handleCreateProjectSubmit = async (name: string, description: string) => {
    setError(null);
    
    try {
      const newProject = await projectService.createProject({
        name,
        description,
      });
      
      setProjects([newProject, ...projects]);
      setSelectedProject(newProject);
      setView('assessment');
    } catch (err: any) {
      console.error('Failed to create project:', err);
      setError(err.message || 'Failed to create project');
      // Stay on create view to show error
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    if (project.status === 'completed') {
      setView('project-dashboard');
    } else {
      setView('assessment');
    }
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setView('projects');
  };

  const handleNavigate = (targetView: string) => {
    setActiveNavItem(targetView);

    // Map navigation items to views
    const viewMap: { [key: string]: View } = {
      'dashboard': 'dashboard',
      'intake-requests': 'intake-requests',
      'agent-catalog': 'agent-catalog',
      'agent-blueprints': 'agent-blueprints',
      'blueprint-studio': 'blueprint-studio',
      'integrations': 'integrations',
      'tools': 'tools',
      'data-stores': 'data-stores',
      'team': 'team',
      'security': 'security',
      'deployed-apps': 'deployed-apps',
      'alerts': 'alerts',
      'agent-iteration': 'agent-iteration',
      'agent-finops': 'agent-finops',
      'agent-monetization': 'agent-monetization',
    };

    const mappedView = viewMap[targetView];
    if (mappedView) {
      setView(mappedView);
      setSelectedProject(null); // Clear selected project when navigating
    }
  };

  const handleCompleteAssessment = async () => {
    if (!selectedProject) return;

    setError(null);

    try {
      const updatedProject = await projectService.completeProject(selectedProject.id);
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
      setSelectedProject(updatedProject);
      setView('project-dashboard');
    } catch (err: any) {
      console.error('Failed to complete project:', err);
      setError(err.message || 'Failed to complete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen without layout
  if (view === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // All main views use AppLayout
  if (
    view === 'dashboard' ||
    view === 'intake-requests' ||
    view === 'agent-catalog' ||
    view === 'agent-blueprints' ||
    view === 'blueprint-studio' ||
    view === 'integrations' ||
    view === 'tools' ||
    view === 'data-stores' ||
    view === 'team' ||
    view === 'security' ||
    view === 'deployed-apps' ||
    view === 'alerts' ||
    view === 'agent-iteration' ||
    view === 'agent-finops' ||
    view === 'agent-monetization' ||
    view === 'marketplace'
  ) {
    let content;

    switch (view) {
      case 'dashboard':
        content = <Dashboard />;
        break;
      case 'intake-requests':
        content = <IntakeRequests />;
        break;
      case 'agent-catalog':
        content = <AgentCatalog />;
        break;
      case 'agent-blueprints':
        content = <AgentBlueprints />;
        break;
      case 'blueprint-studio':
        content = <BlueprintStudio />;
        break;
      case 'integrations':
        content = <Integrations />;
        break;
      case 'tools':
        content = <Tools />;
        break;
      case 'data-stores':
        content = <DataStores />;
        break;
      case 'team':
        content = <Team />;
        break;
      case 'security':
        content = <Security />;
        break;
      case 'deployed-apps':
        content = <DeployedApps />;
        break;
      case 'alerts':
        content = <Alerts />;
        break;
      case 'agent-iteration':
        content = <AgentIteration />;
        break;
      case 'agent-finops':
        content = <AgentFinOps />;
        break;
      case 'agent-monetization':
        content = <AgentMonetization />;
        break;
      case 'marketplace':
        content = <RequestPipeline />;
        break;
      default:
        content = <Dashboard />;
    }

    return (
      <AppLayout
        currentUser={currentUser}
        onLogout={handleLogout}
        activeItem={activeNavItem}
        onNavigate={handleNavigate}
      >
        {content}
      </AppLayout>
    );
  }

  // All other authenticated views use the old Layout for backward compatibility
  return (
    <Layout
      currentUser={currentUser}
      onLogout={handleLogout}
      currentView={view}
      onNavigate={handleNavigate}
    >
      {view === 'projects' && (
        <ProjectsList
          projects={projects}
          onCreateProject={handleCreateProject}
          onSelectProject={handleSelectProject}
          loading={loadingProjects}
          error={error}
        />
      )}

      {view === 'create' && (
        <CreateProject
          onBack={handleBackToProjects}
          onCreate={handleCreateProjectSubmit}
        />
      )}

      {view === 'assessment' && selectedProject && (
        <AssessmentChat
          project={selectedProject}
          onBack={handleBackToProjects}
          onComplete={handleCompleteAssessment}
        />
      )}

      {view === 'project-dashboard' && selectedProject && (
        <ProjectDashboard
          project={selectedProject}
          onBack={handleBackToProjects}
        />
      )}
    </Layout>
  );
}

export default App;

/**
 * Project Conversation Page
 * Shows project details and conversation with agent
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ConversationPanel } from '../components/ConversationPanel';
import { Project, projectService } from '../services/projectService';
import './ProjectConversationPage.css';

export const ProjectConversationPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const projectData = await projectService.getProject(projectId);
      setProject(projectData);
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="project-conversation-loading">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="project-conversation-error">
          <h2>Error</h2>
          <p>{error || 'Project not found'}</p>
          <button onClick={() => navigate('/projects')}>Back to Projects</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="project-conversation-page">
        <div className="page-header">
          <button className="back-button" onClick={() => navigate('/projects')}>
            ← Back to Projects
          </button>
          <h1>{project.name}</h1>
          <div className="project-meta">
            <span className="project-status">{project.status}</span>
            {project.progress && (
              <span className="project-phase">{project.progress.currentPhase}</span>
            )}
          </div>
        </div>

        <div className="project-content">
          <div className="project-info">
            <h2>Project Details</h2>
            {project.description && (
              <div className="info-section">
                <h3>Description</h3>
                <p>{project.description}</p>
              </div>
            )}
            {project.progress && (
              <div className="info-section">
                <h3>Progress</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress.overall}%` }}
                  ></div>
                </div>
                <p>{project.progress.overall}% Complete</p>
              </div>
            )}
          </div>

          <div className="conversation-container">
            <ConversationPanel
              projectId={projectId!}
              agentId="agent1"
              agentName="Assessment Agent"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

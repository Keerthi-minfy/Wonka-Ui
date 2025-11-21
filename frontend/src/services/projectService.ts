/**
 * Project Service
 * Handles all project-related GraphQL operations via AppSync
 */

import serverService from "./server";

export interface ProjectProgress {
  overall: number;
  assessment: number;
  design: number;
  planning: number;
  implementation: number;
  currentPhase: string;
  estimatedCompletion?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
  owner?: string;
  progress?: ProjectProgress;
  // Legacy field for backward compatibility
  lastModified?: string;
  userId?: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  userId?: string;
}

export interface UpdateProjectInput {
  id: string;
  name?: string;
  description?: string;
  status?: "in-progress" | "completed";
}

// GraphQL Queries
const LIST_PROJECTS = `
  query ListProjects {
    listProjects {
      items {
        id
        name
        description
        status
        createdAt
        updatedAt
        owner
        progress {
          overall
          assessment
          design
          planning
          implementation
          currentPhase
          estimatedCompletion
        }
      }
    }
  }
`;

const GET_PROJECT = `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      status
      createdAt
      updatedAt
      owner
      progress {
        overall
        assessment
        design
        planning
        implementation
        currentPhase
        estimatedCompletion
      }
    }
  }
`;

// GraphQL Mutations
const CREATE_PROJECT = `
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      status
      createdAt
      updatedAt
      owner
      progress {
        overall
        assessment
        design
        planning
        implementation
        currentPhase
        estimatedCompletion
      }
    }
  }
`;

const UPDATE_PROJECT = `
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      description
      status
      createdAt
      updatedAt
      owner
      progress {
        overall
        assessment
        design
        planning
        implementation
        currentPhase
        estimatedCompletion
      }
    }
  }
`;

const DELETE_PROJECT = `
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

/**
 * Project Service Class
 */
class ProjectService {
  /**
   * List all projects for the current user
   */
  async listProjects(): Promise<Project[]> {
    try {
      const response = await serverService.query<{
        listProjects: { items: Project[] };
      }>(LIST_PROJECTS);

      // Map backend fields to frontend interface with backward compatibility
      const projects = response.listProjects.items.map((project) => ({
        ...project,
        userId: project.owner || project.userId,
        lastModified: project.updatedAt, // For backward compatibility
      }));

      return projects;
    } catch (error) {
      console.error("Failed to list projects:", error);
      throw new Error("Failed to load projects. Please try again.");
    }
  }

  /**
   * Get a single project by ID
   */
  async getProject(id: string): Promise<Project> {
    try {
      const response = await serverService.query<{ getProject: Project }>(
        GET_PROJECT,
        { id }
      );

      return {
        ...response.getProject,
        userId: response.getProject.owner || response.getProject.userId,
        lastModified: response.getProject.updatedAt, // For backward compatibility
      };
    } catch (error) {
      console.error("Failed to get project:", error);
      throw new Error("Failed to load project details. Please try again.");
    }
  }

  /**
   * Create a new project
   */
  async createProject(input: CreateProjectInput): Promise<Project> {
    try {
      // Note: owner/userId is set automatically by the backend based on authenticated user
      // Remove userId from input as backend doesn't accept it
      const { userId, ...projectInput } = input;

      const response = await serverService.mutate<{ createProject: Project }>(
        CREATE_PROJECT,
        { input: projectInput }
      );

      return {
        ...response.createProject,
        userId: response.createProject.owner || response.createProject.userId,
        lastModified: response.createProject.updatedAt, // For backward compatibility
      };
    } catch (error) {
      console.error("Failed to create project:", error);
      throw new Error("Failed to create project. Please try again.");
    }
  }

  /**
   * Update an existing project
   */
  async updateProject(input: UpdateProjectInput): Promise<Project> {
    try {
      const { id, ...updateInput } = input;

      const response = await serverService.mutate<{ updateProject: Project }>(
        UPDATE_PROJECT,
        { id, input: updateInput }
      );

      return {
        ...response.updateProject,
        userId: response.updateProject.owner || response.updateProject.userId,
        lastModified: response.updateProject.updatedAt, // For backward compatibility
      };
    } catch (error) {
      console.error("Failed to update project:", error);
      throw new Error("Failed to update project. Please try again.");
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    try {
      await serverService.mutate<{ deleteProject: { id: string } }>(
        DELETE_PROJECT,
        { id }
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw new Error("Failed to delete project. Please try again.");
    }
  }

  /**
   * Mark a project as completed
   */
  async completeProject(id: string): Promise<Project> {
    return this.updateProject({
      id,
      status: "completed",
    });
  }

  /**
   * Mark a project as in-progress
   */
  async reopenProject(id: string): Promise<Project> {
    return this.updateProject({
      id,
      status: "in-progress",
    });
  }
}

// Export singleton instance
export const projectService = new ProjectService();

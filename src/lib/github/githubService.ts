import { supabase } from '../supabaseClient';

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export class GitHubService {
  private async getAccessToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.provider_token || null;
  }

  async getUser(): Promise<GitHubUser | null> {
    const token = await this.getAccessToken();
    if (!token) return null;

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error('GitHub user fetch error:', error);
      return null;
    }
  }

  async createRepository(name: string, description: string, isPrivate: boolean = false): Promise<GitHubRepo | null> {
    const token = await this.getAccessToken();
    if (!token) {
      throw new Error('GitHub not connected. Please sign in with GitHub first.');
    }

    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          private: isPrivate,
          auto_init: true,
          license_template: 'mit'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create repository');
      }

      return await response.json();
    } catch (error: any) {
      console.error('GitHub repo creation error:', error);
      throw new Error(error.message || 'Failed to create GitHub repository');
    }
  }

  async createProjectFromCode(files: Array<{ path: string; content: string }>, repoName: string, description: string) {
    // First create the repository
    const repo = await this.createRepository(repoName, description);
    if (!repo) {
      throw new Error('Failed to create repository');
    }

    // For now, return the repo info - in a real implementation, we'd push files via Git API
    return {
      repoUrl: repo.html_url,
      pagesUrl: `https://${repo.owner.login}.github.io/${repo.name}`,
      cloneUrl: repo.clone_url
    };
  }

  async isConnected(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }
}

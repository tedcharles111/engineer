import { Octokit } from 'octokit';

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async createRepository(name: string, description: string, isPrivate: boolean = false) {
    try {
      const response = await this.octokit.rest.repos.createForAuthenticatedUser({
        name: name.replace(/[^a-zA-Z0-9-_]/g, '-'),
        description,
        private: isPrivate,
        auto_init: true
      });
      return response.data;
    } catch (error) {
      console.error('GitHub repository creation failed:', error);
      throw new Error('Failed to create GitHub repository');
    }
  }

  async pushFiles(repo: string, owner: string, files: Array<{ path: string; content: string }>) {
    try {
      for (const file of files) {
        await this.octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message: `Add ${file.path}`,
          content: Buffer.from(file.content).toString('base64'),
        });
      }
      return true;
    } catch (error) {
      console.error('GitHub file push failed:', error);
      throw new Error('Failed to push files to GitHub');
    }
  }

  async deployToPages(repo: string, owner: string) {
    try {
      const response = await this.octokit.rest.repos.createPagesSite({
        owner,
        repo,
        source: {
          branch: 'main',
          path: '/'
        }
      });
      return response.data;
    } catch (error) {
      console.error('GitHub Pages deployment failed:', error);
      throw new Error('Failed to deploy to GitHub Pages');
    }
  }

  async createProjectFromCode(files: Array<{ path: string; content: string }>, projectName: string, description: string) {
    const repo = await this.createRepository(projectName, description);
    
    await this.pushFiles(repo.name, repo.owner.login, files);
    
    const pages = await this.deployToPages(repo.name, repo.owner.login);
    
    return {
      repoUrl: repo.html_url,
      pagesUrl: `https://${repo.owner.login}.github.io/${repo.name}`,
      repoName: repo.name
    };
  }
}

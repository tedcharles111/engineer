import { Octokit } from 'octokit';

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async createRepository(name: string, description: string, isPrivate: boolean = false) {
    return await this.octokit.rest.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
      auto_init: true
    });
  }

  async pushFiles(repo: string, owner: string, files: Array<{ path: string; content: string }>) {
    const commits = [];

    for (const file of files) {
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: file.path,
        message: `Add ${file.path}`,
        content: btoa(unescape(encodeURIComponent(file.content))),
      });
    }

    return true;
  }

  async deployToPages(repo: string, owner: string) {
    return await this.octokit.rest.repos.createPagesSite({
      owner,
      repo,
      source: {
        branch: 'main',
        path: '/'
      }
    });
  }
}

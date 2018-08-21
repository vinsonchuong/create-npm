/* @flow */
import type GitHubApi from '@octokit/rest'

export default async function(
  githubApi: GitHubApi,
  repoName: string
): Promise<void> {
  const [owner, repo] = repoName.split('/')
  await githubApi.repos.delete({ owner, repo })
}

/* @flow */
import type GitHubApi from '@octokit/rest'

export default async function(
  githubApi: GitHubApi,
  repoName: string
): Promise<void> {
  const [, name] = repoName.split('/')
  await githubApi.repos.create({ name })
}

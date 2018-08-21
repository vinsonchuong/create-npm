/* @flow */
import type GitHubApi from '@octokit/rest'

export default async function(
  githubApi: GitHubApi,
  repoName: string
): Promise<?{}> {
  const [owner, repo] = repoName.split('/')
  try {
    const response = await githubApi.repos.get({ owner, repo })
    return response.data
  } catch (error) {
    return null
  }
}

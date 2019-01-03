/* @flow */
import type GitHubApi from '@octokit/rest'

export default async function(githubApi: GitHubApi): Promise<string> {
  const {
    data: { login }
  } = await githubApi.users.getAuthenticated()
  return login
}

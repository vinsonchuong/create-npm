/* @flow */
import type GitHubApi from '@octokit/rest'

export default async function(githubApi: GitHubApi): Promise<string> {
  const {
    data: { login }
  } = await githubApi.users.get()
  return login
}

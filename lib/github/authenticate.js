/* @flow */
import GitHubApi from '@octokit/rest'

export default function(token: string): GitHubApi {
  const githubApi = new GitHubApi({
    auth: `token ${token}`
  })
  return githubApi
}

/* @flow */
import GitHubApi from '@octokit/rest'

export default function(token: string): GitHubApi {
  const githubApi = new GitHubApi()
  githubApi.authenticate({ type: 'oauth', token })
  return githubApi
}

/* @flow */
import type GitHubApi from '@octokit/rest'
import { getUser } from './'

export default async function(
  githubApi: GitHubApi,
  repoName: string
): Promise<void> {
  const [org, name] = repoName.split('/')

  const user = await getUser(githubApi)
  if (org === user) {
    await githubApi.repos.create({ name })
  } else {
    await githubApi.repos.createForOrg({ org, name })
  }
}

import {Octokit} from '@octokit/rest'

export default function (token) {
  const githubApi = new Octokit({auth: `token ${token}`})
  return githubApi
}

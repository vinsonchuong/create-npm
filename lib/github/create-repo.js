import {getUser} from './index.js'

export default async function (githubApi, repoName) {
  const [org, name] = repoName.split('/')

  const user = await getUser(githubApi)
  if (org === user) {
    await githubApi.repos.createForAuthenticatedUser({name})
  } else {
    await githubApi.repos.createInOrg({org, name})
  }
}

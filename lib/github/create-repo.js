import {getUser} from './index.js'

export default async function (githubApi, repoName) {
  const [org, name] = repoName.split('/')

  const user = await getUser(githubApi)
  await (org === user
    ? githubApi.repos.createForAuthenticatedUser({name})
    : githubApi.repos.createInOrg({org, name}))
}

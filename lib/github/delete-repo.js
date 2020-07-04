export default async function (githubApi, repoName) {
  const [owner, repo] = repoName.split('/')
  await githubApi.repos.delete({owner, repo})
}

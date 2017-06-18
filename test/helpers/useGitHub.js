/* @flow */
import test from 'ava'
import GitHub from 'github-api'

export default function () {
  const token = process.env.GITHUB_TEST_TOKEN

  test.beforeEach(t => {
    process.env.GITHUB_TOKEN = token
  })

  const gitHub = new GitHub({ token })
  return {
    async listRepositories (username: string): Promise<Array<string>> {
      const { data } = await gitHub.getUser(username).listRepos()
      return data.map(repository => repository.name)
    },

    deleteRepository (slug: string): Promise<void> {
      const [username, repositoryName] = slug.split('/')
      return gitHub.getRepo(username, repositoryName).deleteRepo()
    }
  }
}

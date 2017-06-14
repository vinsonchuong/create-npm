/* @flow */
import test from 'ava'
import GitHub from 'github-api'
import { removeDirectory } from 'create-npm/src/io'
import { createGitHubRepository } from 'create-npm/src/actions'

const gitHubToken = '5668f3241d20e5ffa6b79abf02c3058eb71f58ed'
const gitHub = new GitHub({ token: gitHubToken })

test.afterEach.always(async t => {
  await gitHub.getRepo('test-create-npm', 'test-repo').deleteRepo()
  await removeDirectory('test-repo')
})

test('creates a GitHub repository with the given name', async t => {
  process.env.GITHUB_TOKEN = gitHubToken
  await createGitHubRepository('test-repo')

  const repositories = await gitHub.getUser().listRepos()
  t.is(repositories.data[0].name, 'test-repo')
})

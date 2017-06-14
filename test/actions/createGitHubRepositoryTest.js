/* @flow */
import test from 'ava'
import GitHub from 'github-api'
import { removeDirectory } from 'create-npm/src/io'
import { createGitHubRepository } from 'create-npm/src/actions'

const gitHub = new GitHub({ token: process.env.GITHUB_TEST_TOKEN })

test.afterEach.always(async t => {
  await gitHub.getRepo('test-create-npm', 'test-repo').deleteRepo()
  await removeDirectory('test-repo')
})

test('creates a GitHub repository with the given name', async t => {
  process.env.GITHUB_TOKEN = process.env.GITHUB_TEST_TOKEN
  await createGitHubRepository('test-repo')

  const repositories = await gitHub.getUser().listRepos()
  t.is(repositories.data[0].name, 'test-repo')
})

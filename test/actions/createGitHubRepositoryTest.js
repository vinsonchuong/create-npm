/* @flow */
import test from 'ava'
import * as path from 'path'
import GitHub from 'github-api'
import { removeDirectory } from 'create-npm/src/io'
import { createGitHubRepository } from 'create-npm/src/actions'

const gitHub = new GitHub({ token: process.env.GITHUB_TEST_TOKEN })

test.afterEach.always(async t => {
  await gitHub.getRepo('test-create-npm', 'test-repo').deleteRepo()
  await removeDirectory('test-repo')
})

test('creates a GitHub repository at the given path', async t => {
  process.env.GITHUB_TOKEN = process.env.GITHUB_TEST_TOKEN
  const localPath = path.resolve('test-repo')

  t.is(await createGitHubRepository(localPath), 'test-create-npm/test-repo')

  const repositories = await gitHub.getUser().listRepos()
  t.is(repositories.data[0].name, 'test-repo')
})

/* @flow */
import test from 'ava'
import * as path from 'path'
import useGitHub from 'create-npm/test/helpers/useGitHub'
import { removeDirectory } from 'create-npm/src/io'
import { createGitHubRepository } from 'create-npm/src/actions'

const gitHub = useGitHub()

test.afterEach.always(async t => {
  await gitHub.deleteRepository('test-create-npm/test-repo')
  await removeDirectory('test-repo')
})

test('creates a GitHub repository at the given path', async t => {
  const localPath = path.resolve('test-repo')
  await createGitHubRepository(localPath)

  const repositories = await gitHub.listRepositories('test-create-npm')
  t.true(repositories.includes('test-repo'))
})

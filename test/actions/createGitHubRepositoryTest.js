/* @flow */
import test from 'ava'
import * as path from 'path'
import useGitHub from 'create-npm/test/helpers/useGitHub'
import useGitSshKey from 'create-npm/test/helpers/useGitSshKey'
import { removeDirectory } from 'create-npm/src/io'
import { createGitHubRepository } from 'create-npm/src/actions'

const gitHub = useGitHub()
useGitSshKey()

test.afterEach.always(async t => {
  await gitHub.deleteRepository('test-create-npm/test-repo')
  await removeDirectory('test-repo')
})

test.serial(
  'creates a GitHub repository for the current user at the given path',
  async t => {
    const localPath = path.resolve('test-repo')
    await createGitHubRepository(null, 'test-repo', localPath)

    const repositories = await gitHub.listRepositories('test-create-npm')
    t.true(repositories.includes('test-repo'))
  }
)

test.serial(
  'creates a GitHub repository for the given org and user at the given path',
  async t => {
    const localPath = path.resolve('test-repo')
    await createGitHubRepository('test-create-npm', 'test-repo', localPath)

    const repositories = await gitHub.listRepositories('test-create-npm')
    t.true(repositories.includes('test-repo'))
  }
)

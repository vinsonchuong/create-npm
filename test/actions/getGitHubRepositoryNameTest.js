/* @flow */
import test from 'ava'
import * as path from 'path'
import { exec, removeDirectory } from 'create-npm/src/io'
import { getGitHubRepositoryName } from 'create-npm/src/actions'

test.beforeEach(async t => {
  await exec('hub clone test-create-npm/existing-repo')
})

test.afterEach.always(async t => {
  await removeDirectory('existing-repo')
})

test('reading the name of a GitHub repository', async t => {
  const localPath = path.resolve('existing-repo')
  t.is(
    await getGitHubRepositoryName(localPath),
    'test-create-npm/existing-repo'
  )
})

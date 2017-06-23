/* @flow */
import test from 'ava'
import * as path from 'path'
import useGitHub from 'create-npm/test/helpers/useGitHub'
import useGitSshKey from 'create-npm/test/helpers/useGitSshKey'
import { removeDirectory, writeFile, exec } from 'create-npm/src/io'
import { createGitHubRepository, commitChanges } from 'create-npm/src/actions'

const gitHub = useGitHub()
useGitSshKey()
const localPath = path.resolve('test-commit-changes')

test.beforeEach(async t => {
  await createGitHubRepository(localPath)
})

test.afterEach.always(async t => {
  await gitHub.deleteRepository('test-create-npm/test-commit-changes')
  await removeDirectory(localPath)
})

test.serial('commits changes to a GitHub repository', async t => {
  await writeFile(path.join(localPath, 'README'), 'foo')

  await commitChanges(localPath, 'Initial Commit')

  const gitCommit = await exec('git show --stat origin/master', {
    cwd: localPath
  })
  t.true(gitCommit.includes('Initial Commit'))
  t.true(gitCommit.includes('README'))
})

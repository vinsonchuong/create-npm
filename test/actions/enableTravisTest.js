/* @flow */
import test from 'ava'
import * as path from 'path'
import useGitHub from 'create-npm/test/helpers/useGitHub'
import useGitSshKey from 'create-npm/test/helpers/useGitSshKey'
import useTravis from 'create-npm/test/helpers/useTravis'
import { exec, removeDirectory } from 'create-npm/src/io'
import { enableTravis, createGitHubRepository } from 'create-npm/src/actions'

const travis = useTravis()
const gitHub = useGitHub()
useGitSshKey()

const newRepoPath = path.resolve('new-travis-repo')

test.serial('enabling Travis CI for a given GitHub repo', async t => {
  await enableTravis('test-create-npm/existing-repo')
  const repositories = await travis.getRepos('test-create-npm')
  await exec('travis disable --repo test-create-npm/existing-repo')

  const repository = repositories.find(
    ({ slug }) => slug === 'test-create-npm/existing-repo'
  )
  t.true(repository && repository.active)
})

test.serial('enabling Travis CI for a new GitHub repo', async t => {
  try {
    const newRepoSlug = 'test-create-npm/new-travis-repo'

    await createGitHubRepository(newRepoPath)
    await enableTravis(newRepoSlug)
    const repositories = await travis.getRepos('test-create-npm')
    await exec('travis disable --repo test-create-npm/new-travis-repo')

    const repository = repositories.find(({ slug }) => slug === newRepoSlug)
    t.true(repository && repository.active)
  } finally {
    await gitHub.deleteRepository('test-create-npm/new-travis-repo')
    await removeDirectory('new-travis-repo')
  }
})

test.serial('enabling a repo while Travis is syncing', async t => {
  const sync = exec('travis sync')
  await enableTravis('test-create-npm/existing-repo')
  await sync
  await exec('travis disable --repo test-create-npm/existing-repo')
  t.pass()
})

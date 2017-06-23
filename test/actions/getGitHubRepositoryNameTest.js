/* @flow */
import test from 'ava'
import useGitHub from 'create-npm/test/helpers/useGitHub'
import useGitHubRepository from 'create-npm/test/helpers/useGitHubRepository'
import useGitSshKey from 'create-npm/test/helpers/useGitSshKey'
import { getGitHubRepositoryName } from 'create-npm/src/actions'

useGitHub()
useGitSshKey()
const localPath = useGitHubRepository('test-create-npm/existing-repo')

test('reading the name of a GitHub repository', async t => {
  t.is(
    await getGitHubRepositoryName(localPath),
    'test-create-npm/existing-repo'
  )
})

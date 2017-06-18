/* @flow */
import test from 'ava'
import useGitHubRepository from 'create-npm/test/helpers/useGitHubRepository'
import { getGitHubRepositoryName } from 'create-npm/src/actions'

const localPath = useGitHubRepository('test-create-npm/existing-repo')

test('reading the name of a GitHub repository', async t => {
  t.is(
    await getGitHubRepositoryName(localPath),
    'test-create-npm/existing-repo'
  )
})

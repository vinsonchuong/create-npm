/* @flow */
import test from 'ava'
import useTravis from 'create-npm/test/helpers/useTravis'
import { exec } from 'create-npm/src/io'
import { enableTravis } from 'create-npm/src/actions'

const travis = useTravis()

test.afterEach.always(async t => {
  await exec('travis disable --repo test-create-npm/existing-repo')
})

test('enabling Travis CI for a given GitHub repo', async t => {
  await enableTravis('test-create-npm/existing-repo')
  const repositories = await travis.getRepos('test-create-npm')

  const repository = repositories.find(
    ({ slug }) => slug === 'test-create-npm/existing-repo'
  )
  t.true(repository && repository.active)
})

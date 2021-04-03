import test from 'ava'
import {v1 as uuid} from 'uuid'
import {authenticate, getRepo, createRepo, deleteRepo} from './index.js'

test('creating and deleting GitHub repos', async (t) => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const repoName = `vinsonchuong/${uuid()}`
  const githubApi = await authenticate(githubToken)

  t.is(await getRepo(githubApi, repoName), null)

  await createRepo(githubApi, repoName)
  t.not(await getRepo(githubApi, repoName), null)

  await deleteRepo(githubApi, repoName)
  t.is(await getRepo(githubApi, repoName), null)
})

test('creating and deleting GitHub repos for orgs', async (t) => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const repoName = `test-github-integrations/${uuid()}`
  const githubApi = await authenticate(githubToken)

  t.is(await getRepo(githubApi, repoName), null)

  await createRepo(githubApi, repoName)
  t.not(await getRepo(githubApi, repoName), null)

  await deleteRepo(githubApi, repoName)
  t.is(await getRepo(githubApi, repoName), null)
})

/* @flow */
import test from 'ava'
import { promisify } from 'util'
import uuid from 'uuid/v1'
import { authenticate, getRepo, createRepo, deleteRepo } from './'

const sleep = promisify(setTimeout)

test('creating and deleting GitHub repos', async t => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const repoName = `vinsonchuong/${uuid()}`
  const githubApi = await authenticate(githubToken)

  t.is(await getRepo(githubApi, repoName), null)

  await createRepo(githubApi, repoName)
  await sleep(1000)
  t.not(await getRepo(githubApi, repoName), null)

  await deleteRepo(githubApi, repoName)
  await sleep(1000)
  t.is(await getRepo(githubApi, repoName), null)
})

test('creating and deleting GitHub repos for orgs', async t => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const repoName = `splayd/${uuid()}`
  const githubApi = await authenticate(githubToken)

  t.is(await getRepo(githubApi, repoName), null)

  await createRepo(githubApi, repoName)
  await sleep(1000)
  t.not(await getRepo(githubApi, repoName), null)

  await deleteRepo(githubApi, repoName)
  await sleep(1000)
  t.is(await getRepo(githubApi, repoName), null)
})

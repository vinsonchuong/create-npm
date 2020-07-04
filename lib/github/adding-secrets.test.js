import test from 'ava'
import {promisify} from 'util'
import {v1 as uuid} from 'uuid'
import {authenticate, createRepo, addSecretToRepo, deleteRepo} from './index.js'

const sleep = promisify(setTimeout)

test('creating and deleting GitHub repos', async (t) => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const repoName = `vinsonchuong/${uuid()}`
  const githubApi = await authenticate(githubToken)

  await createRepo(githubApi, repoName)
  await sleep(1000)

  t.teardown(async () => {
    await deleteRepo(githubApi, repoName)
  })

  await addSecretToRepo(githubApi, repoName, 'NAME', 'VALUE')

  t.pass()
})

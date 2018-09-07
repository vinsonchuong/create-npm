/* @flow */
import test from 'ava'
import { authenticate, getUser } from './'

test('getting the  current user', async t => {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return t.fail()
  }

  const githubApi = await authenticate(githubToken)

  t.is(await getUser(githubApi), 'vinsonchuong')
})

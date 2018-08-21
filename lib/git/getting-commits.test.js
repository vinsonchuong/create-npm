/* @flow */
import test from 'ava'
import * as path from 'path'
import { getCommits } from './'

test('reading git config values', async t => {
  const commits = await getCommits(path.resolve())
  t.true(commits[0].includes('HEAD -> master'))
})

import test from 'ava'
import path from 'path'
import {getCommits} from './index.js'

test('reading git config values', async (t) => {
  const commits = await getCommits(path.resolve())
  t.true(commits[0].includes('origin/master'))
})

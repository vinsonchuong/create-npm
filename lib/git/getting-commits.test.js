import path from 'node:path'
import test from 'ava'
import {getCommits} from './index.js'

test('reading git commits', async (t) => {
  const commits = await getCommits(path.resolve())
  t.true(
    commits.includes(
      'a85db84 feat(yarn): Use Yarn v3 as it is now supported by Dependabot',
    ),
  )
})

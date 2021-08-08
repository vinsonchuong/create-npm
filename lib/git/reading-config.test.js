import process from 'node:process'
import test from 'ava'
import {getConfig} from './index.js'

test('reading git config values', async (t) => {
  if (process.env.CI) {
    t.is(await getConfig('user.name'), 'John Doe')
  } else {
    t.is(await getConfig('branch.master.remote'), 'origin')
  }
})

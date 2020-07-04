import test from 'ava'
import {getConfig} from './index.js'

test('reading git config values', async (t) => {
  t.is(await getConfig('branch.master.remote'), 'origin')
})

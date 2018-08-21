/* @flow */
import test from 'ava'
import { getConfig } from './'

test('reading git config values', async t => {
  t.is(await getConfig('branch.master.remote'), 'origin')
})

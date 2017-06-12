/* @flow */
import test from 'ava'
import useBinFixtures from 'create-npm/test/helpers/useBinFixtures'
import { getAuthorEmail } from 'create-npm/src/actions'

useBinFixtures()

test('reading email from git config', async t => {
  t.is(await getAuthorEmail(), 'vinsonchuong@gmail.com')
})

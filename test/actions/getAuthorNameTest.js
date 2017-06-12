/* @flow */
import test from 'ava'
import useBinFixtures from 'create-npm/test/helpers/useBinFixtures'
import { getAuthorName } from 'create-npm/src/actions'

useBinFixtures()

test('reading name from git config', async t => {
  t.is(await getAuthorName(), 'Vinson Chuong')
})

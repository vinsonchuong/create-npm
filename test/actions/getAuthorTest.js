/* @flow */
import test from 'ava'
import useBinFixtures from 'create-npm/test/helpers/useBinFixtures'
import { getAuthor } from 'create-npm/src/actions'

useBinFixtures()

test('reading name and email from git config', async t => {
  t.is(await getAuthor(), 'Vinson Chuong <vinsonchuong@gmail.com>')
})

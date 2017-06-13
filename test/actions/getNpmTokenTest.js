/* @flow */
import test from 'ava'
import useBinFixtures from 'create-npm/test/helpers/useBinFixtures'
import { getNpmToken } from 'create-npm/src/actions'

useBinFixtures()

test.beforeEach(t => {
  process.env.NPM_AUTH_TOKEN = ''
})

test.serial('reading npm auth token from .npmrc', async t => {
  t.is(await getNpmToken(), '11111111-2222-3333-4444-555555555555')
})

test.serial('reading npm auth token from environment', async t => {
  process.env.NPM_AUTH_TOKEN = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  t.is(await getNpmToken(), 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
})

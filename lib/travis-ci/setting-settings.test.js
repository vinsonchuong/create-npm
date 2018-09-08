/* @flow */
import test from 'ava'
import { getSetting, setSetting } from './'

test('setting settings', async t => {
  const token = process.env.TRAVIS_TOKEN
  if (!token) {
    return t.fail()
  }

  t.true(await getSetting('vinsonchuong/create-npm', 'build_pushes', token))

  await setSetting('vinsonchuong/create-npm', 'build_pushes', false, token)
  t.false(await getSetting('vinsonchuong/create-npm', 'build_pushes', token))

  await setSetting('vinsonchuong/create-npm', 'build_pushes', true, token)
  t.true(await getSetting('vinsonchuong/create-npm', 'build_pushes', token))
})

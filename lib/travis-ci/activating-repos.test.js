/* @flow */
import test from 'ava'
import { sync, isActive, activate, deactivate } from './'

test('activating repos', async t => {
  const token = process.env.TRAVIS_TOKEN
  if (!token) {
    return t.fail()
  }

  await sync(token)

  t.true(await isActive('vinsonchuong/create-npm', token))

  await deactivate('vinsonchuong/create-npm', token)
  t.false(await isActive('vinsonchuong/create-npm', token))

  await activate('vinsonchuong/create-npm', token)
  t.true(await isActive('vinsonchuong/create-npm', token))
})

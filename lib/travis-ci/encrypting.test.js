/* @flow */
import test from 'ava'
import { encrypt } from './'

test('encrypting strings', async t => {
  const token = process.env.TRAVIS_TOKEN
  if (!token) {
    return t.fail()
  }

  const result = await encrypt('vinsonchuong/create-npm', 'secret', token)
  t.is(result.length, 684)
  t.true(result.endsWith('='))
})

/* @flow */
import test from 'ava'
import hello from 'create-npm/src/hello'

test('hello', t => {
  t.is(hello(), 'world')
})

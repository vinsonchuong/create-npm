/* @flow */
import test from 'ava'
import * as path from 'path'

export default function() {
  const binFixturePath = path.resolve('test/fixtures/bin')
  const currentPath = process.env.PATH || ''

  test.before(t => {
    process.env.PATH = `${binFixturePath}${path.delimiter}${currentPath}`
  })
}

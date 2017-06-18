/* @flow */
import test from 'ava'
import * as path from 'path'
import { exec, removeDirectory } from 'create-npm/src/io'

export default function (slug: string): string {
  test.beforeEach(async t => {
    await exec(`git clone https://github.com/${slug}`)
  })

  test.afterEach.always(async t => {
    await removeDirectory('existing-repo')
  })

  return path.resolve('existing-repo')
}

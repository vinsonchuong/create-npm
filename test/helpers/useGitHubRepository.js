/* @flow */
import test from 'ava'
import * as path from 'path'
import u from 'updeep'
import { exec, removeDirectory } from 'create-npm/src/io'

export default function (slug: string): string {
  test.beforeEach(async t => {
    await exec(`hub clone ${slug}`, {
      env: u({ GITHUB_TOKEN: process.env.GITHUB_TEST_TOKEN }, process.env)
    })
  })

  test.afterEach.always(async t => {
    await removeDirectory('existing-repo')
  })

  return path.resolve('existing-repo')
}

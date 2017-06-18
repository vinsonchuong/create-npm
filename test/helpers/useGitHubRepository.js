/* @flow */
import test from 'ava'
import * as path from 'path'
import { exec, removeDirectory } from 'create-npm/src/io'

export default function (repoName: string): string {
  test.beforeEach(async t => {
    await exec('hub clone test-create-npm/existing-repo')
  })

  test.afterEach.always(async t => {
    await removeDirectory('existing-repo')
  })

  return path.resolve('existing-repo')
}

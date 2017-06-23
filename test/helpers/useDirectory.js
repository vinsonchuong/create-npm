/* @flow */
import test from 'ava'
import * as path from 'path'
import { makeDirectory, removeDirectory } from 'create-npm/src/io'

export default function (name: string): string {
  const directoryPath = path.resolve(name)

  test.beforeEach(async t => {
    await makeDirectory(directoryPath)
  })

  test.afterEach.always(async t => {
    await removeDirectory(directoryPath)
  })

  return directoryPath
}

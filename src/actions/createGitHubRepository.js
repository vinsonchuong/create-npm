/* @flow */
import * as path from 'path'
import { exec } from 'create-npm/src/io'

export default async function (name: string): Promise<void> {
  await exec(`git init '${name}'`)
  await exec('hub create', { cwd: path.resolve(name) })
}

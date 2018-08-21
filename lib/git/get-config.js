/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(name: string) {
  const { stdout } = await exec(`git config --get ${name}`)
  return stdout.trim()
}

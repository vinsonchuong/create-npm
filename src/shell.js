/* @flow */
import { childProcess } from 'node-promise-es6'

export async function exec (command: string): Promise<string> {
  const { stdout } = await childProcess.exec(command)
  return stdout.trim()
}

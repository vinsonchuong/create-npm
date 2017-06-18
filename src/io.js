/* @flow */
import * as path from 'path'
import { childProcess, fs } from 'node-promise-es6'

export async function exec (
  command: string,
  {
    cwd = path.resolve(),
    env = process.env
  }: {
    cwd?: string,
    env?: { [string]: ?string }
  } = {}
): Promise<string> {
  const { stdout } = await childProcess.exec(command, { cwd })
  return stdout.trim()
}

export async function readFile (filePath: string): Promise<string> {
  const contents = await fs.readFile(filePath, 'utf8')
  return contents.trim()
}

export async function removeDirectory (name: string): Promise<void> {
  await exec(`rm -rf '${name}'`)
}

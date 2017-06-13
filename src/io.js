/* @flow */
import { childProcess, fs } from 'node-promise-es6'

export async function exec (command: string): Promise<string> {
  const { stdout } = await childProcess.exec(command)
  return stdout.trim()
}

export async function readFile (filePath: string): Promise<string> {
  const contents = await fs.readFile(filePath, 'utf8')
  return contents.trim()
}

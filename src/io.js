/* @flow */
import * as path from 'path'
import { childProcess } from 'node-promise-es6'
import * as fs from 'fs-extra'

export async function exec(
  command: string,
  {
    cwd = path.resolve(),
    env = process.env
  }: {
    cwd?: string,
    env?: { [string]: ?string }
  } = {}
): Promise<string> {
  const { stdout } = await childProcess.exec(command, { cwd, env })
  return stdout.trim()
}

export { pathExists } from 'fs-extra'

export async function readFile(filePath: string): Promise<string> {
  const contents = await fs.readFile(filePath, 'utf8')
  return contents.trim()
}

export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  await fs.outputFile(filePath, content)
}

export async function makeDirectory(directoryPath: string): Promise<void> {
  await fs.ensureDir(directoryPath)
}

export async function removeDirectory(directoryPath: string): Promise<void> {
  await exec(`rm -rf '${directoryPath}'`)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

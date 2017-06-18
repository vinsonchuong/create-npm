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
  if (command.startsWith('hub clone')) {
    const child = childProcess.spawn('hub', 'clone', 'test-create-npm/existing-repo', { cwd, env })
    child.stdout.on('data', data => {
      console.log(data)
    })
    child.stderr.on('data', data => {
      console.log(data)
    })
  }
  const { stdout } = await childProcess.exec(command, { cwd, env })
  return stdout.trim()
}

export async function readFile (filePath: string): Promise<string> {
  const contents = await fs.readFile(filePath, 'utf8')
  return contents.trim()
}

export async function removeDirectory (name: string): Promise<void> {
  await exec(`rm -rf '${name}'`)
}

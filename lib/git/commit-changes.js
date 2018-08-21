/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(projectDirectory: string, message: string) {
  await exec('git init', { cwd: projectDirectory })
  await exec('git add -A', { cwd: projectDirectory })
  await exec(`git commit -m '${message}'`, { cwd: projectDirectory })
}

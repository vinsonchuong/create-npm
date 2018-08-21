/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(projectDirectory: string) {
  const { stdout } = await exec(
    'git log --pretty=oneline --abbrev-commit --decorate',
    { cwd: projectDirectory }
  )
  return stdout.split('\n')
}

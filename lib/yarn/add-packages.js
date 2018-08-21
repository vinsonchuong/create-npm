/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(
  projectDirectory: string,
  type: 'runtime' | 'development',
  packages: Array<string>
): Promise<void> {
  if (type === 'runtime') {
    await exec(`yarn add ${packages.join(' ')}`, {
      cwd: projectDirectory
    })
  } else {
    await exec(`yarn add --dev ${packages.join(' ')}`, {
      cwd: projectDirectory
    })
  }
}

import * as childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory, packages) {
  await exec(`yarn remove ${packages.join(' ')}`, {
    cwd: projectDirectory
  })
}

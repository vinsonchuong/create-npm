import * as childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory, type, packages) {
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

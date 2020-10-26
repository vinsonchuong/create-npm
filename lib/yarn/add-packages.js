import childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory, type, packages) {
  await (type === 'runtime'
    ? exec(`yarn add ${packages.join(' ')}`, {
        cwd: projectDirectory
      })
    : exec(`yarn add --dev ${packages.join(' ')}`, {
        cwd: projectDirectory
      }))
}

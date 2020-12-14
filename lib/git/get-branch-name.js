import childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory) {
  const {stdout} = await exec('git branch --show-current', {
    cwd: projectDirectory
  })

  return stdout.trim()
}

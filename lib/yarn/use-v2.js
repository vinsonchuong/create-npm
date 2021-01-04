import {promises as fs} from 'fs'
import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory) {
  await exec('yarn set version berry', {cwd: projectDirectory})
  await fs.appendFile(
    path.join(projectDirectory, '.yarnrc.yml'),
    'nodeLinker: node-modules\n'
  )
}

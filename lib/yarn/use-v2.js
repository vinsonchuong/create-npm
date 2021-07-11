import {promises as fs} from 'node:fs'
import path from 'node:path'
import childProcess from 'node:child_process'
import {promisify} from 'node:util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory) {
  await exec('yarn set version berry', {cwd: projectDirectory})
  await fs.appendFile(
    path.join(projectDirectory, '.yarnrc.yml'),
    'nodeLinker: node-modules\n'
  )
}

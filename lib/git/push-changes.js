/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(
  projectDirectory: string,
  repoName: string,
  token: string
) {
  await exec(
    `git remote add origin https://create-npm:${token}@github.com/${repoName}`,
    {
      cwd: projectDirectory
    }
  )
  await exec('git push -u origin master', { cwd: projectDirectory })
  await exec(`git remote set-url origin git@github.com:${repoName}.git`, {
    cwd: projectDirectory
  })
}

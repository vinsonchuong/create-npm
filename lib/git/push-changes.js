/* @flow */
import * as childProcess from 'child_process'
import { promisify } from 'util'

const exec = promisify(childProcess.exec)

export default async function(
  projectDirectory: string,
  repoName: string,
  token: string
) {
  await exec(`git remote add origin git@github.com:${repoName}.git`, {
    cwd: projectDirectory
  })
  await exec('git branch --set-upstream-to origin/master')
  await exec(
    `git push https://create-npm:${token}@github.com/${repoName} master`,
    { cwd: projectDirectory }
  )
}
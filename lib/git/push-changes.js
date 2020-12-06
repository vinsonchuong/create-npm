import childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function (projectDirectory, repoName, token) {
  const {stdout} = await exec('git branch --show-current', {
    cwd: projectDirectory
  })
  const branchName = stdout.trim()

  await exec(
    `git remote add origin https://create-npm:${token}@github.com/${repoName}`,
    {
      cwd: projectDirectory
    }
  )
  await exec(`git push -u origin ${branchName}`, {cwd: projectDirectory})
  await exec(`git remote set-url origin git@github.com:${repoName}.git`, {
    cwd: projectDirectory
  })
}

/* @flow */
import { exec } from 'create-npm/src/io'

export default async function (
  repoPath: string,
  commitMessage: string
): Promise<void> {
  await exec('git add -A', { cwd: repoPath })
  await exec(`git commit -m "${commitMessage}"`, { cwd: repoPath })
  await exec('git push -u origin master', { cwd: repoPath })
}

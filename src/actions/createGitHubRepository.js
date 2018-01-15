/* @flow */
import { exec } from 'create-npm/src/io'

export default async function(
  orgName: ?string,
  repoName: string,
  localPath: string
): Promise<void> {
  const name = orgName ? `${orgName}/${repoName}` : repoName

  await exec(`git init '${localPath}'`)
  await exec(`hub create ${name}`, { cwd: localPath })
}

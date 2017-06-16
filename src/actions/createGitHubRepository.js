/* @flow */
import { exec } from 'create-npm/src/io'
import { getGitHubRepositoryName } from 'create-npm/src/actions'

export default async function (localPath: string): Promise<string> {
  await exec(`git init '${localPath}'`)
  await exec('hub create', { cwd: localPath })
  return getGitHubRepositoryName(localPath)
}

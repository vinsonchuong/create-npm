/* @flow */
import { exec } from 'create-npm/src/io'

export default async function (localPath: string): Promise<void> {
  await exec(`git init '${localPath}'`)
  await exec('hub create', { cwd: localPath })
}

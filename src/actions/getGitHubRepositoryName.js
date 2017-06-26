/* @flow */
import * as url from 'url'
import { exec } from 'create-npm/src/io'

export default async function(localPath: string): Promise<string> {
  const gitHubUrl = await exec('hub browse -u', { cwd: localPath })
  const parsedUrl = url.parse(gitHubUrl)
  if (!parsedUrl || !parsedUrl.pathname) {
    throw new Error('Not a GitHub Repository')
  }
  return parsedUrl.pathname.slice(1)
}

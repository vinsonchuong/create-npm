/* @flow */
import { exec, readFile } from 'create-npm/src/io'

export default async function(): Promise<string> {
  if (process.env.NPM_AUTH_TOKEN) {
    return process.env.NPM_AUTH_TOKEN
  }

  const configPath = await exec('npm config get userconfig')
  const config = await readFile(configPath)

  return readConfig(config, '//registry.npmjs.org/:_authToken') || ''
}

function readConfig(config: string, name: string): ?string {
  for (const line of config.split('\n')) {
    if (line.startsWith(`${name}=`)) {
      return line.split('=')[1]
    }
  }
}

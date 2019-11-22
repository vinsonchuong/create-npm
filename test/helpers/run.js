/* @flow */
import * as path from 'path'
import * as childProcess from 'child_process'
import { promisify } from 'util'

type Config = {
  bin: string,
  args: Array<string>,
  env: { [string]: string }
}

const exec = promisify(childProcess.exec)

export default async function({
  bin,
  args,
  env
}: Config): Promise<{ stdout: string, stderr: string }> {
  return exec(
    `node -r overdub/register ${path.resolve(
      'src',
      'bin',
      `${bin}.js`
    )} ${args.join(' ')}`,
    {
      // $FlowFixMe
      env: { ...process.env, ...env }
    }
  )
}

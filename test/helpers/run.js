import * as path from 'path'
import * as childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function ({bin, args, env}) {
  return exec(
    `node ${path.resolve('src', 'bin', `${bin}.js`)} ${args.join(' ')}`,
    {
      env: {...process.env, ...env}
    }
  )
}

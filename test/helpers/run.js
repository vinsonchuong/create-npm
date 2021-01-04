import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export default async function ({bin, args, env, cwd = path.resolve()}) {
  return exec(
    `node ${path.resolve('src', 'bin', `${bin}.js`)} ${args.join(' ')}`,
    {
      env: {...process.env, ...env},
      cwd
    }
  )
}

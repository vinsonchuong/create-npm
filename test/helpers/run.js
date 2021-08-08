import path from 'node:path'
import process from 'node:process'
import childProcess from 'node:child_process'
import {promisify} from 'node:util'

const exec = promisify(childProcess.exec)

export default async function ({bin, args, env, cwd = path.resolve()}) {
  return exec(
    `node ${path.resolve('src', 'bin', `${bin}.js`)} ${args.join(' ')}`,
    {
      env: {...process.env, ...env},
      cwd,
    },
  )
}

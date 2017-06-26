/* @flow */
import test from 'ava'
import * as path from 'path'

export default function(): void {
  test.beforeEach(async t => {
    process.env.GIT_SSH_COMMAND = `ssh -i ${path.resolve('keys', 'id_rsa')}`
    process.env.SSH_AUTH_SOCK = ''
  })
}

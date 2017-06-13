/* @flow */
import { exec } from 'create-npm/src/io'

export default function (): Promise<string> {
  return exec('git config --get user.name')
}

/* @flow */
import { exec } from 'create-npm/src/shell'

export default function (): Promise<string> {
  return exec('git config --get user.email')
}

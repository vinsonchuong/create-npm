/* @flow */
import { exec } from 'create-npm/src/io'

export default function(): Promise<string> {
  return exec(`travis token --no-interactive`)
}

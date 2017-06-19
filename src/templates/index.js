/* @flow */
import dedent from 'dedent'

import flowconfig from './flowconfig'
import gitignore from './gitignore'
import license from './license'
import packagejson from './packagejson'
import readme from './readme'
import travisyml from './travisyml'

export type Template = {
  path: string,
  content: string
}

export function file (
  strings: Array<string>,
  ...interpolations: Array<string>
): string {
  return `${dedent(strings, ...interpolations)}\n`
}

export default [flowconfig, gitignore, license, packagejson, readme, travisyml]

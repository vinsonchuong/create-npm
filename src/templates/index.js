/* @flow */
import dedent from 'dedent'

import bin from './bin'
import flowconfig from './flowconfig'
import gitignore from './gitignore'
import license from './license'
import main from './main'
import packagejson from './packagejson'
import readme from './readme'
import test from './test'
import travisyml from './travisyml'

export type Template = {
  path: string,
  content: string
}

export function file(
  strings: Array<string>,
  ...interpolations: Array<string>
): string {
  return `${dedent(strings, ...interpolations)}\n`
}

export default [
  bin,
  flowconfig,
  gitignore,
  license,
  main,
  packagejson,
  readme,
  test,
  travisyml
]

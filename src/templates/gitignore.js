/* @flow */
import type { Template } from './'
import dedent from 'dedent'

export default function (): Template {
  const path = '.gitignore'
  const content = dedent`
    /node_modules
  `
  return { path, content }
}

/* @flow */
import type { Template } from './'
import { file } from './'

export default function (): Template {
  const path = '.gitignore'
  const content = file`
    /node_modules
  `
  return { path, content }
}

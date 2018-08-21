/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function(_: {}): Template {
  return {
    path: '.gitignore',
    content: `
      /node_modules
    `
  }
}

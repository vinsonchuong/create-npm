/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function(_: {}): Template {
  return {
    path: 'index.js',
    content: `
      /* @flow */
      export default 'Hello World!'
    `
  }
}

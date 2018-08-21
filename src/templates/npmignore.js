/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function(_: {}): Template {
  return {
    path: '.npmignore',
    content: `
      **/*.test.js
      **/test.js
      test/
    `
  }
}

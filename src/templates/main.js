/* @flow */
import type { Template } from './'
import dedent from 'dedent'

export default function (): Template {
  const path = `src/greeting.js`
  const content = dedent`
    /* @flow */
    export default 'Hello World!'
  `
  return { path, content }
}

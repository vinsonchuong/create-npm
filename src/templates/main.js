/* @flow */
import type { Template } from './'
import { file } from './'

export default function(): Template {
  const path = `src/greeting.js`
  const content = file`
    /* @flow */
    export default 'Hello World!'
  `
  return { path, content }
}

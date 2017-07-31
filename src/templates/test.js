/* @flow */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  packageName: string
}

export default function({ packageName }: TemplateData): Template {
  const path = `test/greetingTest.js`
  const content = file`
    /* @flow */
    import test from 'ava'
    import greeting from '${packageName}'

    test('is the correct string', t => {
      t.is(greeting, 'Hello World!')
    })
  `
  return { path, content }
}

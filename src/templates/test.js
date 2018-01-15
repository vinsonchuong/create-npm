/* @flow */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  repoName: string
}

export default function({ repoName }: TemplateData): Template {
  const path = `test/greetingTest.js`
  const content = file`
    /* @flow */
    import test from 'ava'
    import greeting from '${repoName}'

    test('is the correct string', t => {
      t.is(greeting, 'Hello World!')
    })
  `
  return { path, content }
}

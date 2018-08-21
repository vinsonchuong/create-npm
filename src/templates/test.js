/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function({ repoName }: { repoName: string }): Template {
  const [, packageName] = repoName.split('/')

  return {
    path: 'test.js',
    content: `
      /* @flow */
      import test from 'ava'
      import greeting from '${packageName}'

      test('exporting "Hello World!"', t => {
        t.is(greeting, 'Hello World!')
      })
    `
  }
}

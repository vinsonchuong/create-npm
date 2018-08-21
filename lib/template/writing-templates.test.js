/* @flow */
import ava from 'ava'
import * as path from 'path'
import { withDirectory } from 'create-npm/test/fixtures'
import { readFile } from 'fs-extra'
import { writeTemplate } from './'

const test = withDirectory(ava)

test('writing templates', async t => {
  const { directory } = t.context

  const template = {
    path: 'README.txt',
    content: `
      Hello World!
    `
  }
  await writeTemplate(directory, template)

  t.is(
    await readFile(path.join(directory, 'README.txt'), 'utf8'),
    'Hello World!\n'
  )
})

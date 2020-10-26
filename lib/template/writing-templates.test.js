import test from 'ava'
import path from 'path'
import {withDirectory} from '../../test/fixtures/index.js'
import fs from 'fs-extra'
import {writeTemplate} from './index.js'

withDirectory(test)

test('writing templates', async (t) => {
  const {directory} = t.context

  const template = {
    path: 'README.txt',
    content: `
      Hello World!
    `
  }
  await writeTemplate(directory, template)

  t.is(
    await fs.readFile(path.join(directory, 'README.txt'), 'utf8'),
    'Hello World!\n'
  )
})

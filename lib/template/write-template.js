/* @flow */
import type { Template } from './'
import * as path from 'path'
import dedent from 'dedent'
import { outputFile } from 'fs-extra'

export default async function(
  rootDirectory: string,
  template: Template
): Promise<void> {
  await outputFile(
    path.join(rootDirectory, template.path),
    `${dedent(template.content)}\n`
  )
}

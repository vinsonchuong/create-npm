/* @flow */
import * as path from 'path'
import { writeFile } from 'create-npm/src/io'

export default async function (
  localPath: string,
  templates: Array<({ [string]: string }) => { path: string, content: string }>,
  data: { [string]: string }
): Promise<void> {
  for (const template of templates) {
    const { path: filePath, content } = template(data)
    await writeFile(path.resolve(localPath, filePath), content)
  }
}

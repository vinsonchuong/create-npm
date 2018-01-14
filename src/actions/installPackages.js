/* @flow */
import * as path from 'path'
import { exec, writeFile } from 'create-npm/src/io'

export default async function(
  localPath: string,
  runtimeDependencies: Array<string>,
  developmentDependencies: Array<string>
): Promise<void> {
  await writeFile(path.join(localPath, 'package.json'), '{}')

  if (runtimeDependencies.length > 0) {
    await exec(`yarn add ${runtimeDependencies.join(' ')}`, { cwd: localPath })
  }

  if (developmentDependencies.length > 0) {
    await exec(`yarn add --dev ${developmentDependencies.join(' ')}`, {
      cwd: localPath
    })
  }
}

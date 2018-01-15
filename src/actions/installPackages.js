/* @flow */
import * as path from 'path'
import { exec, pathExists, writeFile } from 'create-npm/src/io'

export default async function(
  localPath: string,
  runtimeDependencies: Array<string>,
  developmentDependencies: Array<string>
): Promise<void> {
  const packageJsonPath = path.join(localPath, 'package.json')
  if (!await pathExists(packageJsonPath)) {
    await writeFile(packageJsonPath, '{}')
  }

  if (runtimeDependencies.length > 0) {
    await exec(`yarn add ${runtimeDependencies.join(' ')}`, { cwd: localPath })
  }

  if (developmentDependencies.length > 0) {
    await exec(`yarn add --dev ${developmentDependencies.join(' ')}`, {
      cwd: localPath
    })
  }
}

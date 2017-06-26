/* @flow */
import { exec } from 'create-npm/src/io'

export default async function(
  localPath: string,
  runtimeDependencies: Array<string>,
  developmentDependencies: Array<string>
): Promise<void> {
  if (runtimeDependencies.length > 0) {
    await exec(`yarn add ${runtimeDependencies.join(' ')}`, { cwd: localPath })
  }

  if (developmentDependencies.length > 0) {
    await exec(`yarn add --dev ${developmentDependencies.join(' ')}`, {
      cwd: localPath
    })
  }
}

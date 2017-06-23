/* @flow */
import { exec } from 'create-npm/src/io'

export default async function (
  localPath: string,
  runtimeDependencies: Array<string>,
  developmentDependencies: Array<string>
): Promise<void> {
  await exec(`yarn add ${runtimeDependencies.join(' ')}`, { cwd: localPath })
  await exec(`yarn add --dev ${developmentDependencies.join(' ')}`, {
    cwd: localPath
  })
}

/* @flow */
import test from 'ava'
import * as path from 'path'
import useDirectory from 'create-npm/test/helpers/useDirectory'
import { readFile } from 'create-npm/src/io'
import { installPackages } from 'create-npm/src/actions'

const localPath = useDirectory('test-install-packages')

test.serial('installing npm packages', async t => {
  await installPackages(localPath, ['react'], ['ava'])
  const packageJson = await readPackageJson(localPath)
  t.truthy(packageJson.dependencies.react)
  t.truthy(packageJson.devDependencies.ava)
})

test.serial('installing only runtime dependencies', async t => {
  await installPackages(localPath, ['react'], [])
  const packageJson = await readPackageJson(localPath)
  t.truthy(packageJson.dependencies.react)
})

test.serial('installing only development dependencies', async t => {
  await installPackages(localPath, [], ['ava'])
  const packageJson = await readPackageJson(localPath)
  t.truthy(packageJson.devDependencies.ava)
})

type PackageJson = {
  dependencies: { [string]: string },
  devDependencies: { [string]: string }
}
async function readPackageJson (localPath: string): Promise<PackageJson> {
  return JSON.parse(await readFile(path.join(localPath, 'package.json')))
}
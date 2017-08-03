#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import {
  commitChanges,
  createGitHubRepository,
  enableTravis,
  encryptForTravis,
  getAuthorEmail,
  getAuthorName,
  getGitHubRepositoryName,
  getTravisApiKey,
  installPackages,
  writeTemplates
} from 'create-npm/src/actions'
import templates from 'create-npm/src/templates'

async function run() {
  const packageName = process.argv[2]
  const localPath = path.resolve(packageName)

  await createGitHubRepository(localPath)
  const repositoryName = await getGitHubRepositoryName(localPath)
  console.log(`Created GitHub repository ${repositoryName}`)

  await enableTravis(repositoryName)
  console.log(`Enabled Travis CI for ${repositoryName}`)

  const authorName = await getAuthorName()
  const authorEmail = await getAuthorEmail()
  const travisApiKey = await getTravisApiKey()
  const encryptedAuthorEmail = await encryptForTravis(
    repositoryName,
    authorEmail
  )
  const encryptedTravisApiKey = await encryptForTravis(
    repositoryName,
    travisApiKey
  )
  await writeTemplates(localPath, templates, {
    packageName,
    repositoryName,
    authorName,
    authorEmail,
    encryptedAuthorEmail,
    encryptedTravisApiKey
  })
  console.log('Wrote boilerplate files')

  await installPackages(
    localPath,
    [],
    [
      'ava',
      'babel-preset-diff',
      'babel-register',
      'build-esm',
      'flow-bin',
      'standard-esnext'
    ]
  )
  console.log('Installed npm packages')

  await commitChanges(localPath, 'Create npm package')
  console.log('Committed changes')
}
run()

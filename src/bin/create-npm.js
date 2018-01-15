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

function parseInput(
  name: string
): { orgName: ?string, repoName: string, localPath: string } {
  if (name.includes('/')) {
    const [orgName, repoName] = name.split('/')
    const localPath = path.resolve(repoName)
    return { orgName, repoName, localPath }
  } else {
    const orgName = null
    const repoName = name
    const localPath = path.resolve(repoName)
    return { orgName, repoName, localPath }
  }
}

async function run() {
  console.log('\nCreating npm project\n')

  const { orgName, repoName, localPath } = parseInput(process.argv[2])

  await createGitHubRepository(orgName, repoName, localPath)
  const repositorySlug = await getGitHubRepositoryName(localPath)
  console.log(`Created GitHub repository ${repositorySlug}`)

  await enableTravis(repositorySlug)
  console.log(`Enabled Travis CI for ${repositorySlug}`)

  const authorName = await getAuthorName()
  const authorEmail = await getAuthorEmail()
  const travisApiKey = await getTravisApiKey()
  const encryptedAuthorEmail = await encryptForTravis(
    repositorySlug,
    authorEmail
  )
  const encryptedTravisApiKey = await encryptForTravis(
    repositorySlug,
    travisApiKey
  )
  await writeTemplates(localPath, templates, {
    repoName,
    repositorySlug,
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

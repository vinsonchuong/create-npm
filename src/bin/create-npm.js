#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import {
  createGitHubRepository,
  getAuthorName,
  getAuthorEmail,
  getGitHubRepositoryName,
  enableTravis,
  writeTemplates
} from 'create-npm/src/actions'
import templates from 'create-npm/src/templates'

async function run () {
  const packageName = process.argv[2]
  const localPath = path.resolve(packageName)

  await createGitHubRepository(localPath)
  const repositoryName = await getGitHubRepositoryName(localPath)

  await enableTravis(repositoryName)

  const authorName = await getAuthorName()
  const authorEmail = await getAuthorEmail()
  await writeTemplates(localPath, templates, {
    packageName,
    repositoryName,
    authorName,
    authorEmail
  })
}
run()

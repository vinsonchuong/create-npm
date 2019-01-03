#!/usr/bin/env node
/* @flow */
import * as path from 'path'
import { authenticate, createRepo } from 'create-npm/lib/github'
import { activate, encrypt } from 'create-npm/lib/travis-ci'
import { getConfig, commitChanges, pushChanges } from 'create-npm/lib/git'
import { writeTemplate } from 'create-npm/lib/template'
import {
  readme,
  license,
  gitignore,
  packagejson,
  npmignore,
  flowconfig,
  travisyml,
  main,
  test
} from 'create-npm/src/templates'
import { addPackages } from 'create-npm/lib/yarn'

async function run() {
  const repoName = process.argv[2]
  const githubToken = process.env.GITHUB_TOKEN
  const travisToken = process.env.TRAVIS_TOKEN
  const npmToken = process.env.NPM_TOKEN

  console.log('\n')

  if (!repoName || !githubToken || !travisToken || !npmToken) {
    console.log(
      'Usage: GITHUB_TOKEN=? TRAVIS_TOKEN=? NPM_TOKEN=? yarn create user/repo'
    )
    return
  }

  const [, packageName] = repoName.split('/')

  console.log('Creating GitHub Repository')
  const githubApi = await authenticate(githubToken)
  await createRepo(githubApi, repoName)

  console.log('Enabling Travis CI')
  await activate(repoName, travisToken)

  console.log('Writing project files')
  const today = new Date()
  const authorName = await getConfig('user.name')
  const authorEmail = await getConfig('user.email')
  const projectDirectory = path.resolve(packageName)

  await writeTemplate(projectDirectory, readme({ repoName }))
  await writeTemplate(projectDirectory, license({ authorName, today }))
  await writeTemplate(projectDirectory, gitignore({}))

  await writeTemplate(
    projectDirectory,
    packagejson({ repoName, authorName, authorEmail })
  )
  await writeTemplate(projectDirectory, npmignore({}))

  await writeTemplate(projectDirectory, flowconfig({ repoName }))

  await writeTemplate(
    projectDirectory,
    travisyml({
      encryptedGitHubToken: await encrypt(
        repoName,
        `GITHUB_TOKEN=${githubToken}`,
        travisToken
      ),
      encryptedNpmToken: await encrypt(
        repoName,
        `NPM_TOKEN=${npmToken}`,
        travisToken
      )
    })
  )

  await writeTemplate(projectDirectory, main({}))
  await writeTemplate(projectDirectory, test({ repoName }))

  console.log('Installing npm Packages')
  await addPackages(projectDirectory, 'development', [
    'ava',
    'build-esm',
    'flow-bin',
    'flow-typed',
    'overdub',
    'semantic-release',
    'standard-esnext'
  ])

  console.log('Committing Changes')
  await commitChanges(
    projectDirectory,
    `feat(${packageName}): Bootstrap project`
  )

  console.log('Pushing Changes')
  await pushChanges(projectDirectory, repoName, githubToken)
}

run()

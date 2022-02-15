#!/usr/bin/env node
import path from 'node:path'
import process from 'node:process'
import {
  authenticate,
  createRepo,
  addSecretToRepo,
} from '../../lib/github/index.js'
import {getConfig, commitChanges, pushChanges} from '../../lib/git/index.js'
import {writeTemplate} from '../../lib/template/index.js'
import {
  readme,
  license,
  gitignore,
  packagejson,
  npmignore,
  main,
  test,
  githubactions,
  dependabotAction,
  dependabot,
} from '../templates/index.js'
import {usev2, addPackages} from '../../lib/yarn/index.js'

async function run() {
  const repoName = process.argv[2]
  const githubToken = process.env.GITHUB_TOKEN
  const npmToken = process.env.NPM_TOKEN

  console.log('\n')

  if (!repoName || !githubToken || !npmToken) {
    console.log('Usage: GITHUB_TOKEN=? NPM_TOKEN=? yarn create user/repo')
    return
  }

  const [, packageName] = repoName.split('/')
  const branchName = (await getConfig('init.defaultBranch')) || 'master'

  console.log('Creating GitHub Repository')
  const githubApi = await authenticate(githubToken)
  await createRepo(githubApi, repoName)

  console.log('Adding NPM Token to GitHub Repository')
  await addSecretToRepo(githubApi, repoName, 'NPM_TOKEN', npmToken)

  console.log('Writing project files')
  const today = new Date()
  const authorName = await getConfig('user.name')
  const authorEmail = await getConfig('user.email')
  const projectDirectory = path.resolve(packageName)

  await writeTemplate(projectDirectory, readme({repoName}))
  await writeTemplate(projectDirectory, license({authorName, today}))
  await writeTemplate(projectDirectory, gitignore({}))
  await writeTemplate(
    projectDirectory,
    packagejson({repoName, authorName, authorEmail, branchName}),
  )
  await writeTemplate(projectDirectory, npmignore({}))
  await writeTemplate(projectDirectory, main({}))
  await writeTemplate(projectDirectory, test({}))
  await writeTemplate(projectDirectory, githubactions({branchName}))
  await writeTemplate(projectDirectory, dependabotAction({}))
  await writeTemplate(projectDirectory, dependabot({}))

  console.log('Installing npm Packages')
  await usev2(projectDirectory)
  await addPackages(projectDirectory, 'development', [
    'ava',
    'xo',
    'semantic-release',
  ])

  console.log('Committing Changes')
  await commitChanges(
    projectDirectory,
    `feat(${packageName}): Bootstrap project`,
  )

  console.log('Pushing Changes')
  await pushChanges(projectDirectory, repoName, branchName, githubToken)
}

run()

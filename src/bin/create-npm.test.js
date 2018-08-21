/* @flow */
import test from 'ava'
import * as path from 'path'
import * as childProcess from 'child_process'
import { promisify } from 'util'
import uuid from 'uuid/v1'
import { remove } from 'fs-extra'
import { run } from 'create-npm/test/helpers'
import { authenticate, deleteRepo } from 'create-npm/lib/github'
import { getCommits } from 'create-npm/lib/git'
import { deactivate } from 'create-npm/lib/travis-ci'

const exec = promisify(childProcess.exec)

test('bootstrapping an npm package project', async t => {
  const repoName = `vinsonchuong/${uuid()}`
  const [, packageName] = repoName.split('/')

  const githubToken = process.env.GITHUB_TOKEN
  const travisToken = process.env.TRAVIS_TOKEN
  const npmToken = process.env.NPM_TOKEN
  if (!githubToken || !travisToken || !npmToken) {
    return t.fail()
  }

  try {
    const { stdout, stderr } = await run({
      bin: 'create-npm',
      args: [repoName],
      env: {
        GITHUB_TOKEN: githubToken,
        TRAVIS_TOKEN: travisToken,
        NPM_TOKEN: npmToken
      }
    })
    t.log(stdout)
    t.log(stderr)

    await exec('yarn test', { cwd: path.resolve(packageName) })

    const commits = await getCommits(path.resolve(packageName))
    t.true(commits[0].includes('origin/master'))
    t.true(commits[0].includes('Bootstrap project'))
  } finally {
    await remove(packageName)
    await deactivate(repoName, travisToken)
    await deleteRepo(await authenticate(githubToken), repoName)
  }
})

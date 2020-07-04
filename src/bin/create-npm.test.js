import test from 'ava'
import * as path from 'path'
import * as childProcess from 'child_process'
import {promisify} from 'util'
import {v1 as uuid} from 'uuid'
import fs from 'fs-extra'
import {run} from '../../test/helpers/index.js'
import {authenticate, deleteRepo} from '../../lib/github/index.js'
import {getCommits} from '../../lib/git/index.js'

const exec = promisify(childProcess.exec)

test('bootstrapping an npm package project', async (t) => {
  const repoName = `vinsonchuong/${uuid()}`
  const [, packageName] = repoName.split('/')

  const githubToken = process.env.GITHUB_TOKEN
  const npmToken = process.env.NPM_TOKEN
  if (!githubToken || !npmToken) {
    return t.fail()
  }

  const {stdout, stderr} = await run({
    bin: 'create-npm',
    args: [repoName],
    env: {
      GITHUB_TOKEN: githubToken,
      NPM_TOKEN: npmToken
    }
  })
  t.log(stdout)
  t.log(stderr)

  t.teardown(async () => {
    await fs.remove(packageName)
    await deleteRepo(await authenticate(githubToken), repoName)
  })

  await exec('yarn test', {cwd: path.resolve(packageName)})

  const commits = await getCommits(path.resolve(packageName))
  t.true(
    commits[0].includes('origin/master') ||
      commits[0].includes('HEAD -> master')
  )
  t.true(commits[0].includes('Bootstrap project'))
})

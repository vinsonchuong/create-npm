import childProcess from 'node:child_process'
import process from 'node:process'
import {promisify} from 'node:util'
import path from 'node:path'
import test from 'ava'
import {v1 as uuid} from 'uuid'
import {run} from '../../test/helpers/index.js'
import {withDirectory} from '../../test/fixtures/index.js'
import {authenticate, deleteRepo} from '../../lib/github/index.js'
import {getCommits} from '../../lib/git/index.js'

const exec = promisify(childProcess.exec)

withDirectory(test)

test('bootstrapping an npm package project', async (t) => {
  const {directory} = t.context

  const repoName = `vinsonchuong/${uuid()}`
  const [, packageName] = repoName.split('/')

  const githubToken = process.env.GITHUB_TOKEN
  const npmToken = process.env.NPM_TOKEN
  if (!githubToken || !npmToken) {
    return t.fail()
  }

  const {stdout, stderr} = await run({
    cwd: directory,
    bin: 'create-npm',
    args: [repoName],
    env: {
      GITHUB_TOKEN: githubToken,
      NPM_TOKEN: npmToken,
    },
  })
  t.log(stdout)
  t.log(stderr)

  t.teardown(async () => {
    await deleteRepo(await authenticate(githubToken), repoName)
  })

  await exec('yarn test', {cwd: path.join(directory, packageName)})

  const commits = await getCommits(path.join(directory, packageName))
  t.true(
    commits[0].includes('origin/master') ||
      commits[0].includes('HEAD -> master'),
  )
  t.true(commits[0].includes('Bootstrap project'))
})

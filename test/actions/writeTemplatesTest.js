/* @flow */
import test from 'ava'
import * as path from 'path'
import { makeDirectory, readFile, removeDirectory } from 'create-npm/src/io'
import { writeTemplates } from 'create-npm/src/actions'
import templates from 'create-npm/src/templates'

const localPath = path.resolve('package')

test.beforeEach(async t => {
  await makeDirectory(localPath)
})

test.afterEach.always(async t => {
  await removeDirectory(localPath)
})

function readPackageFile(name: string): Promise<string> {
  return readFile(path.resolve(localPath, name))
}

test.serial('writing a collection of templates', async t => {
  const templates = [
    ({ repoName }) => ({
      path: 'README.md',
      content: `# ${repoName}`
    }),
    () => ({
      path: '.gitignore',
      content: '/node_modules'
    })
  ]
  const data = {
    repoName: 'my-pkg'
  }

  await writeTemplates(localPath, templates, data)

  t.is(await readPackageFile('README.md'), '# my-pkg')
  t.is(await readPackageFile('.gitignore'), '/node_modules')
})

test.serial('writing the actual templates', async t => {
  const repoName = 'my-pkg'
  const repositorySlug = 'foobar/my-pkg'
  const authorName = 'Foo Bar'
  const authorEmail = 'foo@example.com'
  const encryptedAuthorEmail = '!!!foo@example.com'
  const encryptedTravisApiKey = '!!!1234'
  await writeTemplates(localPath, templates, {
    repoName,
    repositorySlug,
    authorName,
    authorEmail,
    encryptedAuthorEmail,
    encryptedTravisApiKey
  })

  const bin = await readPackageFile('src/bin/my-pkg.js')
  const flowconfig = await readPackageFile('.flowconfig')
  const gitignore = await readPackageFile('.gitignore')
  const license = await readPackageFile('LICENSE')
  const main = await readPackageFile('src/index.js')
  const packagejson = await readPackageFile('package.json')
  const readme = await readPackageFile('README.md')
  const testCase = await readPackageFile('test/greetingTest.js')
  const travisyml = await readPackageFile('.travis.yml')

  t.true(bin.includes('#!/usr/bin/env node'))
  t.true(
    flowconfig.includes(
      "module.name_mapper='^my-pkg\\/\\(.*\\)$' -> '<PROJECT_ROOT>/\\1'"
    )
  )
  t.true(gitignore.includes('/node_modules'))
  t.true(main.includes('Hello World!'))
  t.true(packagejson.includes('  "name": "my-pkg",'))
  t.true(license.startsWith('The MIT License'))
  t.true(readme.startsWith('# my-pkg'))
  t.true(testCase.includes("import test from 'ava'"))
  t.true(travisyml.includes('tags: true'))
  t.true(travisyml.includes('!!!foo@example.com'))
  t.true(travisyml.includes('!!!1234'))
})

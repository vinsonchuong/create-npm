/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function({
  authorName,
  authorEmail,
  repoName
}: {
  authorName: string,
  authorEmail: string,
  repoName: string
}): Template {
  const [, packageName] = repoName.split('/')

  return {
    path: 'package.json',
    content: `
      {
        "name": "${packageName}",
        "version": "0.0.0",
        "description": "An awesome package",
        "keywords": [],
        "homepage": "https://github.com/${repoName}",
        "bugs": "https://github.com/${repoName}/issues",
        "license": "MIT",
        "author": "${authorName} <${authorEmail}>",
        "repository": "${repoName}",
        "scripts": {
          "prepare": "flow-typed update --skip",
          "test": "standard -v --fix && flow && ava -v",
          "release": "semantic-release",
          "prepack": "build-esm"
        },
        "dependencies": {},
        "devDependencies": {},
        "babel": {
          "presets": [
            "diff"
          ]
        },
        "ava": {
          "require": [
            "@babel/register"
          ]
        }
      }
    `
  }
}

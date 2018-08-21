/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function({
  encryptedNpmToken,
  encryptedGitHubToken
}: {
  encryptedNpmToken: string,
  encryptedGitHubToken: string
}): Template {
  return {
    path: '.travis.yml',
    content: `
      group: travis_latest
      language: node_js
      node_js: node
      cache: yarn
      env:
        global:
        - secure: ${encryptedGitHubToken}
        - secure: ${encryptedNpmToken}
      deploy:
        provider: script
        skip_cleanup: true
        script:
        - yarn release
    `
  }
}

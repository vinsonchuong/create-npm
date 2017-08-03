/* @flow */
import type { Template } from './'
import { safeDump } from 'js-yaml'

type TemplateData = {
  authorName: string,
  encryptedAuthorEmail: string,
  encryptedTravisApiKey: string
}

export default function({
  authorName,
  encryptedAuthorEmail,
  encryptedTravisApiKey
}: TemplateData): Template {
  const path = '.travis.yml'
  const json = {
    dist: 'trusty',
    sudo: 'false',
    language: 'node_js',
    node_js: 'node',
    cache: 'yarn',
    deploy: {
      provider: 'npm',
      skip_cleanup: true,
      on: {
        tags: true
      },
      email: {
        secure: encryptedAuthorEmail
      },
      api_key: {
        secure: encryptedTravisApiKey
      }
    }
  }
  const content = safeDump(json)
  return { path, content }
}

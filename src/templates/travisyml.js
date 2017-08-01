/* @flow */
import type { Template } from './'
import { safeDump } from 'js-yaml'

export default function(): Template {
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
      }
    }
  }
  const content = safeDump(json)
  return { path, content }
}

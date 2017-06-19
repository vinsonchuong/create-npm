/* @flow */
import type { Template } from './'
import { safeDump } from 'js-yaml'

export default function (): Template {
  const path = '.travis.yml'
  const json = {
    dist: 'trusty',
    sudo: 'false',
    language: 'node_js',
    node_js: 'node',
    cache: 'yarn',
    deploy: {
      provider: 'npm',
      on: 'tags'
    }
  }
  const content = safeDump(json)
  return { path, content }
}

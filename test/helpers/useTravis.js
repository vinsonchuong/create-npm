/* @flow */
import test from 'ava'
import { promisify } from 'node-promise-es6'
import Travis from 'travis-ci'

type Repository = {
  slug: string,
  active: boolean
}

export default function() {
  test.beforeEach(t => {
    process.env.TRAVIS_TOKEN = process.env.TRAVIS_TEST_TOKEN
  })

  const travis = new Travis({ version: '2.0.0' })
  return {
    async getRepos(username: string): Promise<Array<Repository>> {
      const { repos } = await promisify(travis.repos(username).get)()
      return repos
    }
  }
}

/* @flow */
import type { Template } from 'create-npm/lib/template'

export default function({ repoName }: { repoName: string }): Template {
  const [, packageName] = repoName.split('/')

  return {
    path: 'README.md',
    content: `
      # ${packageName}
      [![Build Status](https://travis-ci.org/${repoName}.svg?branch=master)](https://travis-ci.org/${repoName})

      An awesome package

      ## Usage
      Install [${packageName}](https://yarnpkg.com/en/package/${packageName})
      by running:

      \`\`\`sh
      yarn add ${packageName}
      \`\`\`
    `
  }
}

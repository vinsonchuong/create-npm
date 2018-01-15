/* @flow */
import type { Template } from './'
import { file } from './'

type TemplateData = {
  repoName: string,
  repositorySlug: string
}

export default function({ repoName, repositorySlug }: TemplateData): Template {
  const path = 'README.md'
  const content = file`
    # ${repoName}
    [![Build Status](https://travis-ci.org/${repositorySlug}.svg?branch=master)](https://travis-ci.org/${repositorySlug})

    An awesome package

    ## Usage
    Install [${repoName}](https://yarnpkg.com/en/package/${repoName})
    by running

    \`\`\`sh
    yarn add ${repoName}
    \`\`\`
  `
  return { path, content }
}

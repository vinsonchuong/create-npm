/* @flow */
import type { Template } from './'
import dedent from 'dedent'

type TemplateData = {
  packageName: string,
  repositoryName: string
}

export default function ({
  packageName,
  repositoryName
}: TemplateData): Template {
  const path = 'README.md'
  const content = dedent`
    # ${packageName}
    [![Build Status](https://travis-ci.org/${repositoryName}.svg?branch=master)](https://travis-ci.org/${repositoryName})

    An awesome package

    ## Usage
    Install [${packageName}](https://yarnpkg.com/en/package/${packageName})
    by running

    \`\`\`sh
    yarn add ${packageName}
    \`\`\`
  `
  return { path, content }
}

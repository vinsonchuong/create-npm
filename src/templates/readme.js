export default function ({repoName}) {
  const [, packageName] = repoName.split('/')

  return {
    path: 'README.md',
    content: `
      # ${packageName}
      [![npm](https://img.shields.io/npm/v/${packageName}.svg)](https://www.npmjs.com/package/${packageName})
      [![CI Status](https://github.com/${repoName}/workflows/CI/badge.svg)](https://github.com/${repoName}/actions?query=workflow%3ACI)
      [![dependencies Status](https://david-dm.org/${repoName}/status.svg)](https://david-dm.org/${repoName})
      [![devDependencies Status](https://david-dm.org/${repoName}/dev-status.svg)](https://david-dm.org/${repoName}?type=dev)

      An awesome package

      ## Usage
      Install [${packageName}](https://www.npmjs.com/package/${packageName})
      by running:

      \`\`\`sh
      yarn add ${packageName}
      \`\`\`
    `
  }
}

export default function ({authorName, authorEmail, repoName}) {
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
          "test": "xo && ava",
          "release": "semantic-release"
        },
        "type": "module",
        "dependencies": {},
        "devDependencies": {},
        "ava": {
          "verbose": true
        },
        "xo": {
          "prettier": true,
          "space": 2,
          "semicolon": false,
          "rules": {
            "import/extensions": "off",
            "import/no-anonymous-default-export": "off",
            "import/no-useless-path-segments": "off",
            "unicorn/import-index": "off"
          }
        }
      }
    `
  }
}

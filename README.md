# create-npm
[![Build Status](https://travis-ci.org/vinsonchuong/create-npm.svg?branch=master)](https://travis-ci.org/vinsonchuong/create-npm)

Bootstrap [npm](https://www.npmjs.com) packages using [Yarn](https://yarnpkg.com)

## Usage
```sh
yarn create npm github-user/my-pkg
```

Running the above command will:

* Bootstrap a JavaScript project with:
  * Support for ES.Next via [Babel](https://babeljs.io/)
  * Type checking via [Flow](https://flow.org/)
  * Testing via [AVA](https://github.com/avajs/ava)
  * Linting via [Standard](https://github.com/feross/standard)
  * Code Style via [Prettier](https://github.com/prettier/prettier)
* Create a GitHub repository for the project
* Enable continuous integration and deployment via
  [Travis CI](https://travis-ci.org/),
  [build-esm](https://github.com/vinsonchuong/build-esm), and
  [semantic-release](https://github.com/semantic-release/semantic-release)

### Prerequisites
To use `create-npm`, the following tools must be installed:

* [yarn](https://yarnpkg.com/)
* [git](https://git-scm.com/)

The following credentials must be given as environment variables:

* `NPM_TOKEN`
* `GITHUB_TOKEN`
* `TRAVIS_TOKEN`

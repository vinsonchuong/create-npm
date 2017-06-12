# create-npm
[![Build Status](https://travis-ci.org/vinsonchuong/create-npm.svg?branch=master)](https://travis-ci.org/vinsonchuong/create-npm)

Bootstrap [npm](https://www.npmjs.com) packages using [Yarn](https://yarnpkg.com)

## Usage
```sh
yarn create npm my-pkg
```

Running the above command will:

* Bootstrap a JavaScript project with:
  * Support for ES.Next via [Babel](https://babeljs.io/)
  * Testing via [AVA](https://github.com/avajs/ava)
  * Linting via [Standard](https://github.com/feross/standard)
  * Code Style via [Prettier](https://github.com/prettier/prettier)
* Create a GitHub repository for the project
* Enable continuous integration and deployment via
  [Travis CI](https://travis-ci.org/) and
  [build-esm](https://github.com/vinsonchuong/build-esm)

### Prerequisites
To use `create-npm`, the following tools must be installed and authenticated:

* [npm](https://docs.npmjs.com/cli/npm)
* [hub](https://hub.github.com/)
* [travis](https://github.com/travis-ci/travis.rb)

Alternatively, credentials for any of the above tools may be provided using
environment variables instead:

* `NPM_AUTH_TOKEN`
* `GITHUB_TOKEN`
* `TRAVIS_TOKEN`

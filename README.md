<h1>SelfAPI</h1>

[![build status](https://img.shields.io/github/workflow/status/joaocasarin/selfapi/CI/main?style=flat-square)](https://github.com/joaocasarin/selfapi/actions/workflows/ci.yml)
[![code coverage](https://img.shields.io/coveralls/github/joaocasarin/selfapi/main?style=flat-square)](https://coveralls.io/github/joaocasarin/selfapi?branch=main)
[![top language](https://img.shields.io/github/languages/top/joaocasarin/selfapi?style=flat-square)](https://github.com/joaocasarin/selfapi)

>This project was built with the goal of learning [TypeScript](https://github.com/microsoft/typescript) + [Jest](https://github.com/facebook/jest) + [ExpressJs](https://github.com/expressjs/express). It should be splitted into microservices, but since it will be only for personal use, it's going to be a monolythe. The SelfAPI is a simple RESTful API, which contains a variety of endpoints, and all of them will be consumed by some kind of front-end of mine.

## Summary

- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Installation](#installation)
- [Usage](#usage)
    - [Serving the app](#serving-the-app)
    - [Running the tests](#running-the-tests)
        - [Alternatives](#alternatives)
    - [Building a production version](#building-a-production-version)
    - [Serving the production version](#serving-the-production-version)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Documentation

Please visit [this](https://joaocasarin.herokuapp.com/v1/docs) website to view the full documentation with all the application endpoints.
## Installation

1. Clone this repo on your local machine:

```sh
$ git clone https://github.com/joaocasarin/selfapi.git
$ cd selfapi
```

To install and set up the project, run:

```sh
$ yarn install
```

Or if you prefer using NPM:

```sh
$ npm install
```

## Usage

### Serving the app

```sh
$ yarn dev
```

### Running the tests

```sh
$ yarn test
```

#### Alternatives

* Enable coverage report
```sh
$ yarn test:cov
```

* Run only UNIT tests WITH coverage report
```sh
$ yarn test:unit
```

* Run only INTEGRATION tests WITH coverage report
```sh
$ yarn test:int
```

### Building a production version

```sh
$ yarn build
```

This command will create a production version of the project
inside your local `dist/` folder

### Serving the production version

```sh
$ yarn start
```

This will use `node` for serving your already
generated production version of the project.

*Note* this requires
[Building a distribution version](#building-a-distribution-version) first.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b feat/my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit 'Add some feature'`
5.  Push to the branch: `git push origin feat/my-new-feature`
6.  Submit a pull request :sunglasses:

## License

[MIT License](https://opensource.org/licenses/MIT) © Joao Casarin

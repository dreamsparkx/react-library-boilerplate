# react-library-boilerplate

[![Dependency Status](https://david-dm.org/dreamsparkx/react-library-boilerplate.svg)](https://david-dm.org/dreamsparkx/react-library-boilerplate)

The main purpose of this repository is to give users structured react library boilerplate.

```sh
cd your-module
npx semantic-release-cli setup
```

edit github workflow yml

```yml
name: module

on:
  release:
    types: [published]
  push:
    branches:
      - master
  pull_request:
  schedule:
    - cron: '0 12 * * *'

jobs:
  build:
    name: Test & Build
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        node: [10, 12, 14]
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.ref }}
      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.OS }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.OS }}-node-
            ${{ runner.OS }}-
      - name: Install dependencies
        run: npm ci
      - name: Run Linting
        run: npm run lint
      - name: Run tests
        run: npm run test
      - name: Run Build
        run: npm run build
  release:
    name: Semantic Release
    runs-on: ubuntu-latest
    if: ${{ github.ref == 'refs/heads/master' }}
    needs: build
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.ref }}
      - name: Setup Node
        uses: actions/setup-node@v1
      - name: Install dependencies
        run: npm install
      - name: Run Build
        run: npm run build
      - name: Release
        run: npm run semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    if: ${{ github.ref == 'refs/heads/master' }}
    needs: build
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.ref }}
      - name: Setup Node
        uses: actions/setup-node@v1
      - name: Install dependencies
        run: npm ci
      - name: Run Build
        run: npm run build
      - name: Deploy Storybook
        run: npm run deploy-storybook
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}

```

To create default storybook:
```
npx -p @storybook/cli sb init
OR
npx sb init
```


Credits:
 - https://blog.harveydelaney.com/creating-your-own-react-component-library/
 - https://github.com/jaebradley/example-rollup-react-component-npm-package

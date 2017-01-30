# html-lens
[![Build Status](https://travis-ci.org/vinsonchuong/html-lens.svg?branch=master)](https://travis-ci.org/vinsonchuong/phantomjs-adapter)

An interface for reading and transforming HTML

## Installing
`html-lens` is available as an
[npm package](https://www.npmjs.com/package/html-lens).

## Usage
```js
import Document from 'html-lens';

const document = new Document(`
  <!doctype html>
  <meta charset="utf-8">
  <p>
    <span>Hello World!</span>
  </p>
`)

console.log(document.toString())

const span = document.querySelectorAll('span')[0]
```

### API Documentation

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```

# js-uri-template
Javascript [RFC 6570](https://tools.ietf.org/html/rfc6570) URI templating.

## Installation

`npm install @btilford/uri-template`

## Usage

```javascript 1.6
const UriTemplate = require('@btilford/uri-template');

const template = UriTemplate.parse('https://github.com/btilford/js-uri-template/tree/{/branch}');
const url = template.expand({branch:'master'}).format();

```

See [usage](https://btilford.github.io/js-uri-template/index.html) for more examples.


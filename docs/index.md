---
title: Readme
 
---

# uri-template
Javascript [RFC 6570](https://tools.ietf.org/html/rfc6570) URI templating.

## Installation

`npm install @btilford/uri-template`

## Usage

```javascript

const { UriTemplate } = require('@btilford/uri-template');

const template = UriTemplate.parse('https://github.com/btilford/js-uri-template/tree/{/branch}');
const url = template.expand({branch:'master'}).format();
// https://github.com/btilford/js-uri-template/tree/master

```

See [usage](https://btilford.github.io/js-uri-template/usage.html) for more examples.

## Features

### Variable Types
* simple variables `{anything}`
* label variables `{.hostname}`
* fragment variables `{#anchor}`
* path segment variables `{/name}`
* path style parameter variables `{;myvar}`
* query variables `{?offset}`
* query continuation variables `{&limit}`
* reserved string variables `{+var}`

### Other

* Explode `{something*}`
* Max Length `{something:10}`
* Multiple args for all types `https://app{.env,tld}`
 
## Builder

There is also a template builder available to build template strings.

```javascript

const { UriTemplateBuilder } = require('@btilford/uri-template');

const templateString = UriTemplateBuilder.from('https://github.com/btilford/js-uri-template/blob')
    .path('branch', 'file')
    .format();
// https://github.com/btilford/js-uri-template/blob{/branch,file}

``` 
 
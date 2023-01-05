# mexie

!WIP!

[![npm package](https://nodei.co/npm/mexie.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mexie/)

[![npm](https://img.shields.io/npm/v/mexie)](https://www.npmjs.com/package/mexie) [![QA](https://github.com/mark-herrmann/mexie/actions/workflows/qa.yml/badge.svg?branch=main)](https://github.com/mark-herrmann/mexie/actions/workflows/qa.yml)

Wrapper for indexeddb detecting manipulation-attacks, using dexie and hmac, written in TypeScript.

## Introduction

This package is a IndexedDB-Wrapper api-compatible with dexie, with a layer of manipulation detection. \
If an attacker was manipulating data this will be detected, using hmacs (Hash-Based-Message-Authentication-Codes).

Use this wrapper like you would with dexie.

Also see [dexie api documentation](https://dexie.org/docs/API-Reference) for details.

## Install (node.js)
```bash
npm i aeskeywrap
```

## Import / Loading

### Node.js

```js
import Mexie from 'dexie';
```

### Browser

```html
<!-- Load the file from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/dexie@0.0.0/dist/dexie.js"></script>

<!-- or load the file from unpkg -->
<script src="https://unpkg.com/dexie@0.0.0/dist/dexie.js"></script>

<!-- or download the file and host it yourself -->
<script src="/js/dexie.js"></script>
```

## Usage

!TBD!

## License
This project is licensed under the [MIT License](LICENSE.txt)
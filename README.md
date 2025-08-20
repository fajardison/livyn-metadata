# @livyn/metadata

[![npm version](https://img.shields.io/npm/v/@livyn/metadata)](https://www.npmjs.com/package/@livyn/metadata)
[![Version](https://img.shields.io/badge/Version-v1.0.0-blue)](https://www.npmjs.com/package/@livyn/metadata?activeTab=versions)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/fajardison/livyn/blob/main/LICENSE)
[![ESM](https://img.shields.io/badge/javascript-ESM-orange)](https://nodejs.org/api/esm.html)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-blue)](https://nodejs.org/)

A lightweight metadata management system for JavaScript/Node.js, supporting TTL, freeze, overwrite, merge, and runtime queries.

---

## Table of Contents
- [Installation](#installation)
- [Overview](#overview)
- [Core Classes](#core-classes)
  - [MetaStore](#metastore)
  - [CacheStore](#cachestore)
- [Basic Usage](#basic-usage)
- [Features](#features)
- [Profile Example](#profile-example)
- [TTL Example](#ttl-example)
- [Overwrite, Freeze, Merge Examples](#overwrite-freeze-merge-examples)
- [Query Examples](#query-examples)
- [ASCII & Banner Display](#ascii--banner-display)
- [API Reference](#api-reference)
- [Author](#author)
- [License](#license)

---

## Installation

```bash
npm install @livyn/metadata
```

---

## Overview

`@livyn/metadata` allows you to store and manage metadata on JavaScript objects or classes with features such as TTL (time-to-live), object freezing, overwrite control, merge support, and runtime queries.

---

## Core Classes

### MetaStore

The main class to define and access metadata.

**Constructor:**
```js
new MetaStore(cacheInstance)
```

**Methods:**
- `define(target, key, value, options)` — define metadata
- `get(target, key)` — retrieve metadata value
- `delete(target, key)` — delete metadata key
- `clear(target)` — remove all metadata for the target
- `has(target, key)` — check if a metadata key exists
- `getAll()` — get all metadata as an object
- `getAllAsArray()` — get all metadata as an array
- `findByKey(searchKey, options)` — search metadata by key
- `findByValue(predicate)` — search metadata by value
- `debug()` — output debug information

---

### CacheStore

A simple cache wrapper used by MetaStore.

**Constructor:**
```js
new CacheStore({ max: 2000, ttl: 60000 })
```

**Methods:**
- `set(key, value, ttl)` — set a key with optional TTL
- `get(key)` — get the value for a key
- `delete(key)` — remove a key
- `has(key)` — check if key exists
- `clear()` — clear the cache

---

## Basic Usage

```js
import Metadata from '@livyn/metadata'

const cache = new Metadata.CacheStore();
const store = new Metadata.MetaStore(cache);

class Product {}
const laptop = new Product();

store.define(laptop, 'name', 'Laptop');
store.define(laptop, 'specs.cpu', 'Intel i7');
store.define(laptop, 'specs.ram', '16GB');

console.log(store.get(laptop, 'name')); // Laptop
console.log(store.get(laptop, 'specs.cpu')); // Intel i7
```

---

## Features

- TTL per metadata key
- Freeze objects to prevent modification
- Overwrite control
- Merge objects
- Runtime queries (`findByKey`, `findByValue`)
- Debug information

---

## Profile Example

```js
import Metadata from '@livyn/metadata'

export const cache = new Metadata.CacheStore();
export const metadata = new Metadata.MetaStore(cache);

class LivynProfile {}

metadata.define(LivynProfile, 'framework', {
  name: 'livyn',
  version: '1.0.0',
  codename: 'Garuda',
  author: '@livyn',
  license: 'MIT',
  description: 'A lightweight metadata management system for JavaScript/Node.js, supporting TTL, freeze, overwrite, merge, and runtime queries.',
  repository: 'https://github.com/fajardison/livyn',
  type: 'framework',
  ui: {
    ascii: `
 _ _                   
| (_)_   ___   _ _ __  
| | \\ \\ / / | | | '_ \\ 
| | |\\ V /| |_| | | | |
|_|_| \\_/  \\__, |_| |_|
           |___/       
    `,
    banner: '• @livyn v1.0.0 — Garuda Edition •'
  }
}, { freeze: true });

export default LivynProfile;
```

---

## TTL Example

```js
store.define(laptop, 'name', 'Laptop', { ttl: 10000 });
store.define(laptop, 'specs.cpu', 'Intel i7', { ttl: 5000 });

setTimeout(() => {
  console.log(store.get(laptop, 'specs.cpu')); // undefined after 5s
  console.log(store.get(laptop, 'name')); // still Laptop after 5s
}, 6000);
```

---

## Overwrite, Freeze, Merge Examples

```js
// Overwrite
store.define(laptop, 'brand', 'BrandA');
store.define(laptop, 'brand', 'BrandB', { overwrite: true }); // succeed

// Freeze
store.define(laptop, 'specs', { cpu: 'Intel i7', ram: '16GB' }, { freeze: true });

// Merge
store.define(laptop, 'specs', { storage: '512GB SSD' }, { merge: true });
console.log(store.get(laptop, 'specs'));
// Output includes cpu, ram, storage
```

---

## Query Examples

```js
store.findByKey('cpu', { exact: true });
store.findByValue(v => typeof v === 'string' && v.includes('Intel'));
console.log(store.getAll());
console.log(store.getAllAsArray());
console.log(store.debug());
```

---

## ASCII & Banner Display

```js
import LivynProfile, { metadata } from './profile.js';

console.log(metadata.get(LivynProfile, 'framework.ui.ascii'));
console.log(metadata.get(LivynProfile, 'framework.ui.banner'));
```

**Output:**

```
 _ _                   
| (_)_   ___   _ _ __  
| | \ \ / / | | | '_ \ 
| | |\ V /| |_| | | | |
|_|_| \_/  \__, |_| |_|
           |___/       
• @livyn v1.0.0 — Garuda Edition •
```

---

## API Reference

| Method | Description |
|--------|-------------|
| `define(target, key, value, options)` | Add metadata with options (ttl, freeze, overwrite, merge) |
| `get(target, key)` | Retrieve metadata value |
| `delete(target, key)` | Delete metadata key |
| `clear(target)` | Clear all metadata for target |
| `has(target, key)` | Check if key exists |
| `getAll()` | Return all metadata as an object |
| `getAllAsArray()` | Return all metadata as an array |
| `findByKey(searchKey, options)` | Search metadata by key |
| `findByValue(predicate)` | Search metadata by value |
| `debug()` | Return targets and their metadata for debugging |

---

## Author

**[Dimas Fajar](https://github.com/fajardison)**

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/fajardison/livyn-metadata/tree/main?tab=MIT-1-ov-file) file for details.

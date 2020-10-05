# React-Hibernate

**This package is in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

Restore previously-unmounted subtrees -- state and all -- on remount.

Part of [React Hibernate](https://github.com/spautz/react-hibernate)

[![npm version](https://img.shields.io/npm/v/react-hibernate.svg)](https://www.npmjs.com/package/react-hibernate)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-hibernate)](https://bundlephobia.com/result?p=react-hibernate@latest)

## Core Package

This package provides the main functionality for [React Hibernate](https://github.com/spautz/react-hibernate).

## Roadmap

- [x] Proof of concept
- [x] Project scaffolding
- [x] Core functionality
- [ ] Tests (in progress)
- [x] Demos
- [x] Monorepo
- [ ] Initial release
- [ ] Add: `useHibernatingEffect` hook (successfully prototyped)
- [ ] Add: `maxCacheTime` override per-route (successfully prototyped)
- [ ] Explore: Options to better control which/when to add a subtree
- [ ] Explore: React-Router v6

#### Known Issues

"Cannot update a component from inside the function body of a different component" warning in React 16.13

- This will be addressed as part of supporting React-Router v6, when subtree activation will need to be done via a
  component instead of a callback.

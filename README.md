# Hibernating Components for React & React Router

Bring back previously-unmounted components and children -- state and all -- when they remount.

[![build status](https://github.com/spautz/react-hibernate/workflows/CI/badge.svg)](https://github.com/spautz/react-hibernate/actions)
[![test coverage](https://img.shields.io/coveralls/github/spautz/react-hibernate/main.svg)](https://coveralls.io/github/spautz/react-hibernate?branch=main)

## Overview

When a React component stops being rendered, it's gone: local state, dom state, etc are removed. If you want to retain
any of that prior state, you must store it elsewhere.

This repo provides libraries which can keep the old component tree around for a while, when desired.

Instead of unmounting, the component tree goes into "hibernation". It will "wake up" when you return, including all
internal state, as if you never left.

- [React Router Hibernate](./packages/react-router-hibernate/) works per-route, if you're using
  [React Router](https://reacttraining.com/react-router/) v5
- [React Hibernate](./packages/react-hibernate/) works for any React subtree (not yet published)
- [React Pauseable Containers](./packages/react-pauseable-containers/) improve performances by freezing all updates
  to hibernated subtrees

[Cache options are available](https://github.com/spautz/limited-cache/#options) to control how many subtrees may be
hibernated at a time, and for how long.

## Use Cases

- Screens which are slow to initialize: avoid initializing a second time
- Form values: restore half-completed form fields if the user leaves and come back later
- Background tasks like file uploads: dispatch actions from unmounted components
- Accordion panels, steps in a wizard, or other temporarily-hidden content

In general, this is a "good enough" alternative to storing component state in Redux or an external cache: you _could_
build a powerful system to track internal state and restore partially-completed forms, it would just take development
time. React Hibernate is just a quick, easy way to get "good enough" coverage for the common cases.

## Packages

See each package for detailed docs.

**[react-hibernate](./packages/react-hibernate/)**

[![npm version](https://img.shields.io/npm/v/react-hibernate.svg)](https://www.npmjs.com/package/react-hibernate)

Restore previously-unmounted subtrees -- state and all -- on remount.

**[react-router-hibernate](./packages/react-router-hibernate/)**

[![npm version](https://img.shields.io/npm/v/react-router-hibernate.svg)](https://www.npmjs.com/package/react-router-hibernate)
[![test coverage](https://coveralls.io/repos/github/spautz/react-hibernate/badge.svg?branch=x-cov-react-router-hibernate)](https://coveralls.io/github/spautz/react-hibernate?branch=x-cov-react-router-hibernate)
[![dependencies status](https://img.shields.io/librariesio/release/npm/react-router-hibernate.svg)](https://libraries.io/github/spautz/react-hibernate)
[![gzip size](https://img.badgesize.io/https://unpkg.com/react-router-hibernate@latest/dist/react-router-hibernate.cjs.production.min.js?compression=gzip)](https://bundlephobia.com/result?p=react-router-hibernate@latest)

A react-router Switch which can leave inactive routes mounted-but-inactive until you navigate back.

**[react-pauseable-containers](./packages/react-pauseable-containers/)**

[![npm version](https://img.shields.io/npm/v/react-pauseable-containers.svg)](https://www.npmjs.com/package/react-pauseable-containers)
[![test coverage](https://coveralls.io/repos/github/spautz/react-hibernate/badge.svg?branch=x-cov-react-pauseable-containers)](https://coveralls.io/github/spautz/react-hibernate?branch=x-cov-react-pauseable-containers)
[![dependencies status](https://img.shields.io/librariesio/release/npm/react-pauseable-containers.svg)](https://libraries.io/github/spautz/react-hibernate)
[![gzip size](https://img.badgesize.io/https://unpkg.com/react-pauseable-containers@latest/dist/react-pauseable-containers.cjs.production.min.js?compression=gzip)](https://bundlephobia.com/result?p=react-pauseable-containers@latest)

Prevent subtrees from rerendering when their parent changes, or when values from context change.

**[redux-pauseable-store](./packages/redux-pauseable-store/)**

[![npm version](https://img.shields.io/npm/v/redux-pauseable-store.svg)](https://www.npmjs.com/package/redux-pauseable-store)
[![test coverage](https://coveralls.io/repos/github/spautz/react-hibernate/badge.svg?branch=x-cov-redux-pauseable-store)](https://coveralls.io/github/spautz/react-hibernate?branch=x-cov-redux-pauseable-store)
[![dependencies status](https://img.shields.io/librariesio/release/npm/redux-pauseable-store.svg)](https://libraries.io/github/spautz/react-hibernate)
[![gzip size](https://img.badgesize.io/https://unpkg.com/redux-pauseable-store@latest/dist/redux-pauseable-store.cjs.production.min.js?compression=gzip)](https://bundlephobia.com/result?p=redux-pauseable-store@latest)

Derive one redux store from another, then pause its state and/or actions. This is used by react-pauseable-containers.

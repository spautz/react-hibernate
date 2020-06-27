# Hibernating Components for React & React Router

Bring back previously-unmounted components and subtrees -- state and all -- when they remount.

**These packages are in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

[![build status](https://img.shields.io/travis/com/spautz/react-hibernate/master.svg)](https://travis-ci.com/spautz/react-hibernate/branches)
[![test coverage](https://img.shields.io/coveralls/github/spautz/react-hibernate/master.svg)](https://coveralls.io/github/spautz/react-hibernate?branch=master)

## Overview

When a React component stops being rendered, it's gone: local state, dom state, etc are removed. If you want to keep
that prior state around you must store it elsewhere.

This repo provides libraries which can keep the old subtree around for a while, when desired.

Instead of unmounting, the subtree goes into "hibernation". It will "wake up" when you return, including all internal
state, as if you never left.

- [React Router Hibernate](./packages/react-router-hibernate/) works per-route, if you're using
  [React Router](https://reacttraining.com/react-router/) (v5)
- [React Hibernate](./packages/react-hibernate-core/) works for any React subtree
- [React Pauseable Containers](./packages/react-pauseable-containers/) improve performances by freezing all updates
  to hibernated subtrees

[Cache options are available](https://github.com/spautz/limited-cache/#options) to control how many subtrees may be
hibernated at a time, and for how long.

## Some Use Cases

- Screens which are slow to initialize: avoid initializing a second time
- Form values: restore half-completed form fields if the user leaves and come back later
- Background tasks like file uploads: dispatch actions from unmounted components
- Accordion panels, steps in a wizard, or other temporarily-hidden content

In general, this is a "good enough" alternative to storing component state in Redux or an external cache: you _could_
build a powerful system to track partially-completed forms, it would just take time and engineering. React Hibernate is
just a quick, easy way to get "good enough" coverage for the common cases.

## Packages

**[react-hibernate](./packages/react-hibernate-core/)**

[![npm version](https://img.shields.io/npm/v/react-hibernate.svg)](https://www.npmjs.com/package/react-hibernate)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-hibernate)](https://bundlephobia.com/result?p=react-hibernate@latest)

Restore previously-unmounted subtrees -- state and all -- on remount.

**[react-router-hibernate](./packages/react-router-hibernate/)**

[![npm version](https://img.shields.io/npm/v/react-router-hibernate.svg)](https://www.npmjs.com/package/react-router-hibernate)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-router-hibernate)](https://bundlephobia.com/result?p=react-router-hibernate@latest)

A react-router Switch which can leave inactive routes mounted-but-inactive until you navigate back.

**[react-pauseable-containers](./packages/react-pauseable-containers/)**

[![npm version](https://img.shields.io/npm/v/react-pauseable-containers.svg)](https://www.npmjs.com/package/react-pauseable-containers)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-pauseable-containers)](https://bundlephobia.com/result?p=react-pauseable-containers@latest)

Prevent subtrees from rerendering when their parent changes, or when values from context change.

**[redux-pauseable-store](./packages/redux-pauseable-store/)**

[![npm version](https://img.shields.io/npm/v/redux-pauseable-store.svg)](https://www.npmjs.com/package/redux-pauseable-store)
[![gzip size](https://img.shields.io/bundlephobia/minzip/redux-pauseable-store)](https://bundlephobia.com/result?p=redux-pauseable-store@latest)

Derive one redux store from another, then pause its state and/or actions. This is used by react-pauseable-containers.

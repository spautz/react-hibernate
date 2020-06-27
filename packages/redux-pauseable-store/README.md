# Redux-Pauseable-Store

**This package is in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

Derive one redux store from another, then pause it.

Part of [React Hibernate](../../)

[![npm version](https://img.shields.io/npm/v/redux-pauseable-store.svg)](https://www.npmjs.com/package/redux-pauseable-store)
[![gzip size](https://img.shields.io/bundlephobia/minzip/redux-pauseable-store)](https://bundlephobia.com/result?p=redux-pauseable-store@latest)

## Danger

You probably don't need this library. When used incorrectly it will do more harm than good.

Consider using [`<PauseableReduxContainer>`](../react-pauseable-containers#pauseablereduxcontainer)
from [React Pauseable Containers](../react-pauseable-containers) instead.

## Overview

Whenever Redux updates, its new data will be provided to all components that are subscribed to it. This library
interrupts that.

## Details

If you want to **completely** stop a subtree from rerendering for some time -- as [React Router Hibernate](../react-router-hibernate/),
[React hibernate](../react-hibernate), and [React Pauseable Containers](../react-pauseable-containers) do -- then you
have to prevent anything which would trigger a state change in any component in that subtree.

React-Redux's [useSelector hook](https://react-redux.js.org/next/api/hooks#useselector) works by
[forcing a rerender](https://github.com/reduxjs/react-redux/blob/5402f24db139f7ff01c7f873d136ea7ee3b8d1cb/src/hooks/useSelector.js#L15)
outside of the normal render cycle: it triggers a state change.

This library overwrites the context provider for React Redux to trick it into subscribing to a second Redux store --
which we can then pause and unpause.

## Usage

```
// @TODO
```

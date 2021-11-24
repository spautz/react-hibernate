# React-Pauseable-Containers

Prevent subtrees from rerendering when their parent changes, or when certain context values change.

Part of [React Hibernate](https://github.com/spautz/react-hibernate)

[![npm version](https://img.shields.io/npm/v/react-pauseable-containers.svg)](https://www.npmjs.com/package/react-pauseable-containers)
[![test coverage](https://coveralls.io/repos/github/spautz/react-hibernate/badge.svg?branch=x-cov-react-pauseable-containers)](https://coveralls.io/github/spautz/react-hibernate?branch=x-cov-react-pauseable-containers)
[![dependencies status](https://img.shields.io/librariesio/release/npm/react-pauseable-containers.svg)](https://libraries.io/github/spautz/react-hibernate)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-pauseable-containers)](https://bundlephobia.com/result?p=react-pauseable-containers@latest)

## Overview

When a component's props, state, or context values change, it will rerender. This is fundamental to React and cannot
be avoided.

This package includes components which will prevent those changes from reaching the component where possible.

Each receives a `shouldUpdate` prop: when set to false, changes in outside values will be suppressed.

## Components

#### `<PauseableComponentContainer>`

Prevents children from rerendering when the parent component updates.
This is essentially just a typescript-friendly version of [react-static-container](https://github.com/reactjs/react-static-container/)

#### `<PauseableContextContainer Context={...}>`

Freezes any React context, to prevent subscribed components in the subtree from updating when it changes.

#### `<PauseableReduxContainer dispatchWhenPaused={boolean}>`

Prevents subscribed components from rerendering when the redux state changes, or the return value from `useSelector`.
The `dispatchWhenPaused` prop controls the `canDispatch` option of a [Redux-Pauseable-Store](../redux-pauseable-store).

## How to use this

With [React-Hibernate](../react-hibernate) or [react-pauseable-containers](../react-pauseable-containers/), using one of these
components -- or a new component composed from several of them together -- can prevent subtrees from updating while
they're hibernating, to avoid needless work.

These can also be used on their own.

#### Use Cases

- The background screen behind a modal or dialog
- Inactive tabs or panes when using a wizard, accordion, or tabs widget.
- Freezing UI updates and interactions while performing reauthentication or other blocking tasks

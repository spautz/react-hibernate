# React-Pauseable-Containers

**This package is in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

Prevent subtrees from rerendering when their parent changes, or when certain context values change.

Part of [React Hibernate](https://github.com/spautz/react-hibernate)

[![npm version](https://img.shields.io/npm/v/react-pauseable-containers.svg)](https://www.npmjs.com/package/react-pauseable-containers)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-pauseable-containers)](https://bundlephobia.com/result?p=react-pauseable-containers@latest)

## Overview

When a component's props, state, or context values change, it will rerender. This is fundamental to React and cannot
be avoided.

This package includes components which will prevent those changes from reaching the component where possible.

Each receives a `shouldUpdate` prop: when set to false, changes in outside values will be suppressed.

## Components

#### PauseableComponentContainer

Prevents children from rerendering when the parent component updates.
This is essentially just a typescript-friendly version of [react-static-container](https://github.com/reactjs/react-static-container/)

#### PauseableReduxContainer

Prevents subscribed components from rerendering when the redux state changes, or the return value from `useSelector`.

## How to use this

With [React-Hibernate](../react-hibernate) or [React-Router-Hibernate](../react-router-hibernate/), using one of these
components -- or a new component composed from several of them together -- can prevent subtrees from updating while
they're hibernating, to avoid needless work.

These can also be used on their own to prevent updates in components that are still mounted, such as the background
screen behind a modal or dialog, or inactive tabs or panes when using a wizard, accordion, or tabs widget.

# Redux-Pauseable-Store

Derive one redux store from another, then pause it.

Part of [React Hibernate](https://github.com/spautz/react-hibernate)

[![npm version](https://img.shields.io/npm/v/redux-pauseable-store.svg)](https://www.npmjs.com/package/redux-pauseable-store)
[![test coverage](https://coveralls.io/repos/github/spautz/react-hibernate/badge.svg?branch=x-cov-redux-pauseable-store)](https://coveralls.io/github/spautz/react-hibernate?branch=x-cov-redux-pauseable-store)
[![dependencies status](https://img.shields.io/librariesio/release/npm/redux-pauseable-store.svg)](https://libraries.io/github/spautz/react-hibernate)
[![gzip size](https://img.badgesize.io/https://unpkg.com/redux-pauseable-store@latest/dist/redux-pauseable-store.cjs.production.min.js?compression=gzip)](https://bundlephobia.com/result?p=redux-pauseable-store@latest)

## Danger

You probably don't need this library. When used incorrectly it will do more harm than good.

Consider using [`<PauseableReduxContainer>`](../react-pauseable-containers#pauseablereduxcontainer)
from [React-Pauseable-Containers](../react-pauseable-containers) instead.

## Usage

```
import { createPauseableStore } from 'redux-pauseable-store';

const pauseableStore = createPauseableStore(store, options);
```

`pauseableStore` is _derived from_ the original store, or parent store. It can be paused and unpaused at any time.
When unpaused, any state updates in the parent store will flow directly into the derived store.

You can subscribe to and dispatch actions to the derived store, just like the original store.

## Options

Options can be set at initialization, through helper functions, or by updating the value directly on the store instance.

#### isPaused (boolean, default: `false`)

Whether the pauseable store receives state updates from its parent store.

```
pauseableStore.isPaused;  // boolean
pauseableStore.setPaused(boolean);
```

#### canDispatch (tri-state boolean, default: `'warn'`)

Whether the pauseable store can dispatch actions to its parent store. When enabled, any actions dispatched to the
derived store will instead be routed to the parent store. When to set `'warn'`, a warning will be emitted
(but the action will still be dispatched.)

```
pauseableStore.canDispatch;  // boolean | 'warn'
pauseableStore.setDispatch(boolean | 'warn');
```

#### notifyListersOnUnpause (boolean, default: `true`)

Whether to notify subscribed listeners when the store unpauses, if it was updated while paused. You probably want to
keep this enabled.

```
pauseableStore.notifyListersOnUnpause;  // boolean
```

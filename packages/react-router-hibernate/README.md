# React-Router-Hibernate

A React Router `<Switch>` which can leave inactive routes mounted-but-inactive until you navigate back.

Part of [React Hibernate](https://github.com/spautz/react-hibernate)

[![npm version](https://img.shields.io/npm/v/react-router-hibernate.svg)](https://www.npmjs.com/package/react-router-hibernate)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-router-hibernate)](https://bundlephobia.com/result?p=react-router-hibernate@latest)

## Overview

By defaut, navigating from one `<Route>` to another in react-router will unmount the old route's tree.
If you return to it, it will be remounted from scratch.

This library adds `<HibernatingSwitch>` and `<HibernatingRoute>`: drop-in replacements for `<Switch>` and `<Route>`
which do not immediately unmount components when you navigate away. If you return, the prior tree will be restored,
local state and all.

## Example

```javascript
import { HibernatingSwitch, HibernatingRoute } from 'react-router-hibernate';

// then render:
<HibernatingSwitch maxCacheTime={60000}>

  {/* Use the "Hibernating" variants exactly like the standard ones */}
  <HibernatingRoute path="/foo" component={...} />
  <HibernatingRoute path="/bar" render={...} />

  {/* You can mix and match: use them alongside the normal react-router components */}
  <Route path="/baz" component={...} />
  <Redirect from="/something-else" to="/foo" />

  {/* If you have your own custom components, add an isHibernatingRoute prop */}
  <MyPrivateRoute path="/secret" component={...} isHibernatingRoute />

</HibernatingSwitch>
```

## Props for HibernatingSwitch

#### `maxCacheSize` (number, default: 5)

Number of subtrees to keep in the cache, including the current one. `path` is used for the cache keys.
Set a falsy value to disable.

#### `maxCacheTime` (milliseconds, default: 5 minutes)

Time after which a subtree is removed from the cache. Set a falsy value to disable.

#### `WrapperComponent` (React component, default: none)

A component which wraps all potentially-hibernatable routes. It receives a `shouldUpdate` prop.
[`React-Pauseable-Containers`](../react-pauseable-containers) was created for this.

## How it Works

Each route's subtree is rendered via a [React-Reverse-Portal](https://github.com/httptoolkit/react-reverse-portal),
and the portal nodes are stored and rotated via a [Limited-Cache](https://github.com/spautz/limited-cache).

When you revisit a route which is still in the cache, its prior subtree is reattached. Because the elements and
instances were not destroyed, all prior state is still present -- both React state and dom state.

## Preventing Extra Work in Inactive Routes

Previously-rendered trees are still mounted when inactive: they're just not attached to the dom.

`HibernatingRoute` will suppress the normal render cycle for inactive subtrees, but if a component in the subtree
experiences a state change or [context](https://reactjs.org/docs/context.html) update then it will rerun.
This is fundamental to React and cannot be avoided.

For example: react-redux's [useSelector hook](https://react-redux.js.org/next/api/hooks#useselector) works by
[forcing a rerender](https://github.com/reduxjs/react-redux/blob/5402f24db139f7ff01c7f873d136ea7ee3b8d1cb/src/hooks/useSelector.js#L15)
outside of the normal render cycle by changing local state -- so suppressing the normal render cycle is not enough.

In most cases this is fine -- inactive subtrees still use minimal resources -- but if the component render is slow
or has side effects then you may want to avoid running it at all.

You can do that by setting a `WrapperComponent` which halts context updates.
[`React-Pauseable-Containers`](../react-pauseable-containers) was created for this: you can use its components directly,
compose them together to make your `WrapperComponent`, or follow the examples to make your own from scratch.

## Roadmap

- [x] Proof of concept
- [x] Project scaffolding
- [x] Core functionality
- [x] Tests
- [x] Demos
- [x] Monorepo
- [x] Initial release
- [ ] Add `useHibernatingEffect` hook (successfully prototyped)
- [ ] Add `maxCacheTime` override per-route (successfully prototyped)
- [ ] Explore: Options to better control which/when to add a subtree
- [ ] Explore: React-Router v6

#### Known Issues

"Cannot update a component from inside the function body of a different component" warning in React 16.13+

- This will be addressed as part of supporting React-Router v6, when subtree activation will need to be done via a
  component instead of a callback.

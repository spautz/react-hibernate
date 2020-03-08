# Hibernating Components for React Router

**These packages are in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

Detach a subtree when it unmounts, and bring it back -- state and all -- when it remounts.

[![build status](https://img.shields.io/travis/com/spautz/react-router-hibernate/master.svg)](https://travis-ci.com/spautz/react-router-hibernate/branches)
[![test coverage](https://img.shields.io/coveralls/github/spautz/react-router-hibernate/master.svg)](https://coveralls.io/github/spautz/react-router-hibernate?branch=master)
[![gzip size](https://img.shields.io/bundlephobia/minzip/react-router-hibernate)](https://bundlephobia.com/result?p=react-router-hibernate@latest)

## Overview

By defaut, navigating from one `<Route>` to another in react-router will unmount the old route's tree.
If you return to it, it will be recreated from scratch.

This library adds `<HibernatingSwitch>` and `<HibernatingRoute>`: drop-in replacements for `<Switch>` and `<Route>`
which do not immediately unmount components when you navigate away. If you return, the prior tree will be restored,
local state and all.

## Packages

#### [react-hibernate](./packages/react-hibernate-core/) [![npm version](https://img.shields.io/npm/v/react-hibernate.svg)](https://www.npmjs.com/package/react-hibernate)

Restore previously-unmounted subtrees -- state and all -- on remount.

#### [react-router-hibernate](./packages/react-router-hibernate/) [![npm version](https://img.shields.io/npm/v/react-router-hibernate.svg)](https://www.npmjs.com/package/react-router-hibernate)

A react-router Switch which can leave inactive routes mounted-but-inactive until you navigate back.

#### [react-pauseable-containers](./packages/react-pauseable-containers/) [![npm version](https://img.shields.io/npm/v/react-pauseable-containers.svg)](https://www.npmjs.com/package/react-pauseable-containers)

Prevent subtrees from rerendering when their parent changes, or when certain context values change.

#### [redux-pauseable-store](./packages/redux-pauseable-store/) [![npm version](https://img.shields.io/npm/v/redux-pauseable-store.svg)](https://www.npmjs.com/package/redux-pauseable-store)

Derive one redux store from another, then pause it.

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

  {/* If you have your own custom components, you can add an isHibernatingRoute prop */}
  <MyPrivateRoute path="/secret" component={...} isHibernatingRoute />

</HibernatingSwitch>
```

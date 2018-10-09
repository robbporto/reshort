# reshort

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/reshort.svg?style=flat-square)](https://npmjs.org/package/reshort)
[![Build Status](https://img.shields.io/travis/robbporto/reshort/master.svg?style=flat-square)](https://travis-ci.org/robbporto/reshort) [![Coverage Status](https://img.shields.io/codecov/c/github/robbporto/reshort/master.svg?style=flat-square)](https://codecov.io/gh/robbporto/reshort/branch/master)

Sometimes we write too much repetition in our actions.

Like so:

```js
export const fetchProducts = () => ({
  type: FETCH_PRODUCTS
})

export const fetchProductsSuccessful = payload => ({
  type: FETCH_PRODUCTS_SUCCESSFUL,
  payload
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
})

export const fetchUsers = () => ({
  type: FETCH_USERS
})

export const fetchUsersSuccessful = payload => ({
  type: FETCH_USERS_SUCCESSFUL,
  payload
})

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: error
})
```

This library tries to remove this repetion encapsulating common actions in an action generator.

## Install

    $ npm install --save reshort

## Usage

```js
import reshort from "reshort";

const productsActions = reshort("Products");

productsActions("request")
// {
//   type: "GET_PRODUCTS"
// }

productsActions("success", {test: 123})
// {
//   type: "GET_PRODUCTS_SUCCESSFUL",
//   payload: { test: 123 }
// }

productsActions("fail", {test: "error"})
// {
//   type: "GET_PRODUCTS_FAILURE",
//   payload: { test: "error" }
// }
```

## License

MIT © [Robson Porto](https://github.com/robbporto)

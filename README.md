<br/>
<p align="center">
  <img src="https://i.imgur.com/ItRWLd2.png" width="250" />
</p>

<br/>
<p align="center">
<a href="https://github.com/diegohaz/nod"><img src="https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square" /></a>
<a href="https://npmjs.org/package/reshort"><img src="https://img.shields.io/npm/v/reshort.svg?style=flat-square" /></a>
<a href="https://travis-ci.org/robbporto/reshort"><img src="https://img.shields.io/travis/robbporto/reshort/master.svg?style=flat-square" /></a>
<a href="https://codecov.io/gh/robbporto/reshort/branch/master"><img src="https://img.shields.io/codecov/c/github/robbporto/reshort/master.svg?style=flat-square" /></a>
</p>

<p align="center">
  <img src="https://i.imgur.com/2SUaL34.png"/>
</p>

## Why?

Sometimes we write too much repetition in our action creators.

For example:
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

You can see that we are repeating the same patterns in all our actions!

This library tries to remove this repetition encapsulating common actions in an action generator, like so:

```js
import reshort from "reshort";

const productsActions = reshort("Products");
const usersActions = reshort("Users");
```

## Install and usage

Install using your package manager:
```
npm install --save reshort
```
Then you can create your action creators in one line and use them after!
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

## Options

#### prefix (String = "GET")
Add the defined prefix to the constants of the three actions.
```js
const productsActions = reshort("Products", {
  prefix: "FETCH"
});

productsActions("request")
// {
//   type: "FETCH_PRODUCTS"
// }

productsActions("success", {test: 123})
// {
//   type: "FETCH_PRODUCTS_SUCCESSFUL",
//   payload: { test: 123 }
// }

productsActions("fail", {test: "error"})
// {
//   type: "FETCH_PRODUCTS_FAILURE",
//   payload: { test: "error" }
// }
```

#### successSuffix (String = "SUCCESSFUL")
Add the defined suffix to the constant of the "success" action.
```js
const productsActions = reshort("Products", {
  successSuffix: "WITH_SUCCESS"
});

productsActions("success", {test: 123})
// {
//   type: "FETCH_PRODUCTS_WITH_SUCCESS",
//   payload: { test: 123 }
// }
```

#### failSuffix (String = "FAILURE")
Add the defined suffix to the constant of the "error" action.
```js
const productsActions = reshort("Products", {
  failSuffix: "REJECTED"
});

productsActions("fail", {test: "error"})
// {
//   type: "FETCH_PRODUCTS_REJECTED",
//   payload: { test: "error" }
// }
```
#### customRequestPayload (Function, receives payload)
Applies a custom payload directly to the request action.
Useful if you want to remove the payload variable name around your payload,
or if you want to do some last minute tweaks to your payload.
```js
const productsActions = reshort("Products", {
  customRequestPayload: payload => payload
});

productsActions("request", {test: 123});
// {
//    type: "GET_PRODUCTS",
//    test: 123
// }
```


#### customSuccessPayload (Function, receives payload)
Applies a custom payload directly to the successful action.
Useful if you want to remove the payload variable name around your payload,
or if you want to do some last minute tweaks to your payload.
```js
const productsActions = reshort("Products", {
  customSuccessPayload: (payload) => payload
});

productsActions("success", {test: 123});
// {
//    type: "GET_PRODUCTS_SUCCESSFUL",
//    test: 123
// }
```

#### customFailurePayload (Function, receives payload)
Applies a custom payload directly onto the fail action.
Useful if you want to remove the payload variable name around your payload,
or if you want to do some last minute tweaks to your payload.
```js
const productsActions = reshort("Products", {
  customFailurePayload: (payload) => payload
});

productsActions("fail", {test: "error"})
// {
//    type: "GET_PRODUCTS_FAILURE",
//    test: "error"
// }
```

#### namespace (String = "PRODUCTS")
Add the defined namespace to the constant of the action.
```js
const productsActions = reshort("Items", {
  namespace: "PRODUCTS"
});

productsActions("request", {test: "namespace"})
// {
//   type: "PRODUCTS/GET_ITEMS",
//   payload: { test: "namespace" }
// }
```

## License

MIT © [Robson Porto](https://github.com/robbporto)

<br/>
<p align="center">
  <img src="https://i.imgur.com/ItRWLd2.png" width="250" />
</p>

<br/>
<p align="center">
<a href="https://github.com/diegohaz/nod" target="_blank"><img src="https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square" /></a>
<a href="https://npmjs.org/package/reshort" target="_blank"><img src="https://img.shields.io/npm/v/reshort.svg?style=flat-square" /></a>
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
`npm install --save reshort`
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

## License

MIT © [Robson Porto](https://github.com/robbporto)

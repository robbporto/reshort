import { upperCase, isEmpty } from "lodash";

const mountConstant = (name, type) => {
  const typesOfConstants = {
    request: `GET_${upperCase(name)}`,
    success: `GET_${upperCase(name)}_SUCCESSFUL`,
    fail: `GET_${upperCase(name)}_FAILURE`
  };

  return typesOfConstants[type];
};

const mountRequest = name => (requestType, payload) => {
  if (isEmpty(requestType)) {
    throw new Error("You should define your request type.");
  }

  if (typeof requestType !== "string")
    throw new Error("The request type name should be a string.");

  const typesOfActions = {
    request: () => ({
      type: mountConstant(name, "request"),
      payload
    }),
    success: () => ({
      type: mountConstant(name, "success"),
      payload
    }),
    fail: () => ({
      type: mountConstant(name, "fail"),
      payload
    })
  };

  return typesOfActions[requestType]();
};

const makeCompleteAction = (name, options) => {
  if (isEmpty(name)) throw new Error("You need to set the name of the action.");

  if (typeof name !== "string")
    throw new Error("The action name should be a string.");

  if (!isEmpty(options) && typeof name !== "object")
    throw new Error("The options should be an object.");
  return mountRequest(name, options);
};

export default makeCompleteAction;

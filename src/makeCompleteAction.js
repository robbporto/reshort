import { upperCase, isEmpty } from "lodash";

const hasPrefixOrSuffix = (options, property) =>
  !!(options && options[property]) && options[property];

const mountRequestConstant = (name, options) => {
  if (hasPrefixOrSuffix(options, "prefix")) {
    const { prefix } = options;

    return `${prefix}_${upperCase(name)}`;
  }

  return `GET_${upperCase(name)}`;
};

const mountSuccessOrFailureConstants = (name, options, suffix, constant) => {
  if (
    hasPrefixOrSuffix(options, "prefix") &&
    !hasPrefixOrSuffix(options, suffix)
  ) {
    const { prefix } = options;

    return `${prefix}_${upperCase(name)}_${constant}`;
  }

  if (
    hasPrefixOrSuffix(options, "prefix") &&
    hasPrefixOrSuffix(options, suffix)
  ) {
    const { prefix } = options;
    const optionsSuffix = options[suffix];

    return `${prefix}_${upperCase(name)}_${optionsSuffix}`;
  }

  if (
    !hasPrefixOrSuffix(options, "prefix") &&
    hasPrefixOrSuffix(options, suffix)
  ) {
    const optionsSuffix = options[suffix];

    return `GET_${upperCase(name)}_${optionsSuffix}`;
  }

  return `GET_${upperCase(name)}_${constant}`;
};

const mountConstant = (name, type, options) => {
  const typesOfConstants = {
    request: mountRequestConstant(name, options),
    success: mountSuccessOrFailureConstants(
      name,
      options,
      "successSuffix",
      "SUCCESSFUL"
    ),
    fail: mountSuccessOrFailureConstants(name, options, "failSuffix", "FAILURE")
  };

  return typesOfConstants[type];
};

const mountRequest = (name, options) => (requestType, payload) => {
  if (isEmpty(requestType)) {
    throw new Error("You should define your request type.");
  }

  if (typeof requestType !== "string")
    throw new Error("The request type name should be a string.");

  const typesOfActions = {
    request: () => {
      if (options && options.customSuccessPayload) {
        return Object.assign(
          {
            type: mountConstant(name, "request", options)
          },
          payload
        );
      }

      return {
        type: mountConstant(name, "request", options),
        payload
      };
    },

    success: () => {
      if (options && options.customSuccessPayload) {
        return Object.assign(
          {
            type: mountConstant(name, "success", options)
          },
          payload
        );
      }

      return {
        type: mountConstant(name, "success", options),
        payload
      };
    },

    fail: () => {
      if (options && options.customFailurePayload) {
        return Object.assign(
          {
            type: mountConstant(name, "fail", options)
          },
          payload
        );
      }
      return {
        type: mountConstant(name, "fail", options),
        payload
      };
    }
  };

  return typesOfActions[requestType]();
};

const makeCompleteAction = (name, options) => {
  if (isEmpty(name)) throw new Error("You need to set the name of the action.");

  if (typeof name !== "string")
    throw new Error("The action name should be a string.");

  if (!isEmpty(options) && typeof options !== "object")
    throw new Error("The options should be an object.");

  return mountRequest(name, options);
};

export default makeCompleteAction;

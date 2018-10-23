import makeCompleteAction from "../src/makeCompleteAction";

describe("makeCompleteAction", () => {
  describe("when the parameters are empty", () => {
    it("should show an error message indicating that there's no name parameter", () => {
      expect(() => makeCompleteAction()).toThrow(
        "You need to set the name of the action."
      );
    });

    it("should show an error message when there's no action name", () => {
      const action = makeCompleteAction("Products");

      expect(() => action()).toThrow("You should define your request type");
    });
  });

  describe("when the parameters types are not correct", () => {
    it("should throw an error when the type of the action name is not string", () => {
      expect(() => makeCompleteAction({ test: 123 })).toThrow(
        "The action name should be a string."
      );
    });

    it("should throw an error when the options is not a object", () => {
      expect(() => makeCompleteAction("Products", "Options")).toThrow(
        "The options should be an object."
      );
    });

    it("should throw an error when the type of the request name is not string", () => {
      const action = makeCompleteAction("Products");

      expect(() => action({ test: 123 })).toThrow(
        "The request type name should be a string"
      );
    });
  });

  describe("normal flow", () => {
    it("should return a request action", () => {
      const action = makeCompleteAction("Products");

      expect(action("request")).toEqual({
        type: "GET_PRODUCTS"
      });
    });

    it("should return a success action", () => {
      const action = makeCompleteAction("Products");

      expect(action("success")).toEqual({
        type: "GET_PRODUCTS_SUCCESSFUL"
      });
    });

    it("should return a error action", () => {
      const action = makeCompleteAction("Products");

      expect(action("fail")).toEqual({
        type: "GET_PRODUCTS_FAILURE"
      });
    });

    it("should return a request action with payload", () => {
      const action = makeCompleteAction("Products");

      expect(action("request", { test: 123 })).toEqual({
        type: "GET_PRODUCTS",
        payload: { test: 123 }
      });
    });

    it("should return a success action with payload", () => {
      const action = makeCompleteAction("Products");

      expect(action("success", { test: 123 })).toEqual({
        type: "GET_PRODUCTS_SUCCESSFUL",
        payload: { test: 123 }
      });
    });

    it("should return a error action with payload", () => {
      const action = makeCompleteAction("Products");

      expect(action("fail", { test: 123 })).toEqual({
        type: "GET_PRODUCTS_FAILURE",
        payload: { test: 123 }
      });
    });

    it("should return a request action with the correct custom prefix", () => {
      const action = makeCompleteAction("Products", {
        prefix: "FETCH"
      });

      expect(action("request")).toEqual({
        type: "FETCH_PRODUCTS"
      });
    });

    it("should return a success action with the correct custom prefix", () => {
      const action = makeCompleteAction("Products", {
        prefix: "FETCH"
      });

      expect(action("success")).toEqual({
        type: "FETCH_PRODUCTS_SUCCESSFUL"
      });
    });

    it("should return a success action with the correct custom prefix and suffix", () => {
      const action = makeCompleteAction("Products", {
        prefix: "FETCH",
        successSuffix: "WITH_SUCCESS"
      });

      expect(action("success")).toEqual({
        type: "FETCH_PRODUCTS_WITH_SUCCESS"
      });
    });

    it("should return a request action with the correct custom suffix", () => {
      const action = makeCompleteAction("Products", {
        successSuffix: "WITH_SUCCESS"
      });

      expect(action("success")).toEqual({
        type: "GET_PRODUCTS_WITH_SUCCESS"
      });
    });

    it("should return a error action with the correct custom prefix", () => {
      const action = makeCompleteAction("Products", {
        prefix: "FETCH"
      });

      expect(action("fail")).toEqual({
        type: "FETCH_PRODUCTS_FAILURE"
      });
    });

    it("should return a error action with the correct custom prefix and suffix", () => {
      const action = makeCompleteAction("Products", {
        prefix: "FETCH",
        failSuffix: "REJECTED"
      });

      expect(action("fail")).toEqual({
        type: "FETCH_PRODUCTS_REJECTED"
      });
    });

    it("should return a error action with the correct custom SUFFIX", () => {
      const action = makeCompleteAction("Products", {
        failSuffix: "REJECTED"
      });

      expect(action("fail")).toEqual({
        type: "GET_PRODUCTS_REJECTED"
      });
    });

    it("should return a action with NAMESPACE", () => {
      const action = makeCompleteAction("Items", {
        namespace: "PRODUCTS"
      });

      expect(action("request")).toEqual({
        type: "PRODUCTS/GET_ITEMS"
      });
    });
  });

  describe("with custom payload options", () => {
    const customPayload = payload => payload;

    describe("when given a customRequestPayload option", () => {
      it("should throw an error if the customRequestPayload is not a function", () => {
        const action = makeCompleteAction("products", {
          customRequestPayload: "not a function"
        });

        expect(() => action("request", { test: 123 })).toThrow(
          "options.customRequestPayload should be a function."
        );
      });

      it("should return a request action with a custom payload", () => {
        const action = makeCompleteAction("Products", {
          customRequestPayload: customPayload
        });

        expect(action("request", { test: 123 })).toEqual({
          type: "GET_PRODUCTS",
          test: 123
        });
      });

      it("should return a default payload for the success action", () => {
        const action = makeCompleteAction("Products", {
          customRequestPayload: customPayload
        });

        expect(action("success", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_SUCCESSFUL",
          payload: {
            test: 123
          }
        });
      });

      it("should return a default payload for the failure action", () => {
        const action = makeCompleteAction("Products", {
          customRequestPayload: customPayload
        });

        expect(action("fail", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_FAILURE",
          payload: {
            test: 123
          }
        });
      });
    });

    describe("when passed a customSuccessPayload", () => {
      it("should throw an error if the customSuccessPayload is not a function", () => {
        const action = makeCompleteAction("products", {
          customSuccessPayload: "not a function"
        });

        expect(() => action("success", { test: 123 })).toThrow(
          "options.customSuccessPayload should be a function."
        );
      });

      it("should return a success action with a custom payload", () => {
        const action = makeCompleteAction("Products", {
          customSuccessPayload: customPayload
        });

        expect(action("success", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_SUCCESSFUL",
          test: 123
        });
      });

      it("should return a default payload for the request action", () => {
        const action = makeCompleteAction("Products", {
          customSuccessPayload: customPayload
        });

        expect(action("request", { test: 123 })).toEqual({
          type: "GET_PRODUCTS",
          payload: {
            test: 123
          }
        });
      });

      it("should return a default payload for the failure action", () => {
        const action = makeCompleteAction("Products", {
          customSuccessPayload: customPayload
        });

        expect(action("fail", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_FAILURE",
          payload: {
            test: 123
          }
        });
      });
    });

    describe("when passed a customFailurePayload option", () => {
      it("should throw an error if the customFailurePayload is not a function", () => {
        const action = makeCompleteAction("products", {
          customFailurePayload: "not a function"
        });

        expect(() => action("fail", { test: 123 })).toThrow(
          "options.customFailurePayload should be a function."
        );
      });

      it("should return a failure action with a custom payload", () => {
        const action = makeCompleteAction("Products", {
          customFailurePayload: customPayload,
          payload: { test: "error" }
        });

        expect(action("fail", { test: "error" })).toEqual({
          type: "GET_PRODUCTS_FAILURE",
          test: "error"
        });
      });

      it("should return a default payload for the request action", () => {
        const action = makeCompleteAction("Products", {
          customFailurePayload: customPayload
        });

        expect(action("request", { test: 123 })).toEqual({
          type: "GET_PRODUCTS",
          payload: {
            test: 123
          }
        });
      });

      it("should return a default payload for the success action", () => {
        const action = makeCompleteAction("Products", {
          customFailurePayload: customPayload
        });

        expect(action("success", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_SUCCESSFUL",
          payload: {
            test: 123
          }
        });
      });
    });

    describe("when passed all three customPayload options", () => {
      it("should return custom payloads for all request, success and failure actions", () => {
        const action = makeCompleteAction("Products", {
          customRequestPayload: customPayload,
          customSuccessPayload: customPayload,
          customFailurePayload: customPayload
        });

        expect(action("request", { test: 123 })).toEqual({
          type: "GET_PRODUCTS",
          test: 123
        });

        expect(action("success", { test: 123 })).toEqual({
          type: "GET_PRODUCTS_SUCCESSFUL",
          test: 123
        });

        expect(action("fail", { test: "error" })).toEqual({
          type: "GET_PRODUCTS_FAILURE",
          test: "error"
        });
      });
    });
  });
});

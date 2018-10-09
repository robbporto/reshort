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

  describe("normal flux", () => {
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
  });
});

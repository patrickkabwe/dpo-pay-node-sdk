import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { errorHandler } from "~/helpers/errorHandler";

describe("errorHandler", () => {
  it("should handle axiosError", () => {
    const error = {
      response: {
        data: {
          "?xml": {
            version: "1.0",
            encoding: "utf-8",
          },
          API3G: {
            Result: "801",
            ResultExplanation: "Request missing company token",
          },
        },
        status: 400,
      },
    };

    const axiosError = new AxiosError(
      "Request missing company token",
      "400",
      undefined,
      null,
      {
        config: {} as any,
        request: {},
        headers: {},
        statusText: "Bad Request",
        ...error.response,
      }
    );

    expect(() => errorHandler(axiosError)).toThrowError();
  });

  it("should handle non-axiosError", () => {
    const error = new Error("Request missing company token");

    expect(() => errorHandler(error)).toThrowError();
  });
});

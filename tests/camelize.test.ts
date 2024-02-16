import { describe, expect, it } from "vitest";
import { camelize } from "~/helpers/camelize";

describe("camelize", () => {
  it("should camelize a string", () => {
    const str = "hello_world";
    const result = camelize(str);
    expect(result).toBe("helloWorld");
  });

  it("should camelize a string with a different delimiter", () => {
    const str = "hello-world";
    const result = camelize(str);
    expect(result).toBe("helloWorld");
  });

  it("should camelize a string with a uppercase characters", () => {
    const str = "HelloWorld";
    const result = camelize(str);
    expect(result).toBe("helloWorld");
  });

  it("should camelize a string with a uppercase characters and a different delimiter", () => {
    const str = "Hello-World";
    const result = camelize(str);
    expect(result).toBe("helloWorld");
  });
});

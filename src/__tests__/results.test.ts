import { describe, expect, test } from "vitest";
import {
  isOk,
  ok,
  Result,
  err,
  isErr,
  unwrap,
  unwrapOr,
  unwrapOrElse,
  mapErr,
  map,
} from "..";

describe("Result utils", () => {
  type CustomResult = Result<"success", "fail">;
  const SUCCESS = "success";
  const FAIL = "fail";
  const okResult: CustomResult = ok(SUCCESS);
  const errResult: CustomResult = err(FAIL);

  test("isOk()", () => {
    const shouldBeOk = isOk(okResult);
    expect(shouldBeOk).toEqual(true);

    const shouldNotBeOk = isOk(errResult);
    expect(shouldNotBeOk).toEqual(false);
  });

  test("isErr()", () => {
    const shouldBeErr = isErr(errResult);
    expect(shouldBeErr).toEqual(true);

    const shouldNotBeErr = isErr(okResult);
    expect(shouldNotBeErr).toEqual(false);
  });

  test("unwrap()", () => {
    const value = unwrap(okResult);
    expect(value).toEqual(SUCCESS);

    expect(() => unwrap(errResult)).toThrow("not possible to unwrap Err value");
  });

  test("unwrapOr()", () => {
    const value = unwrapOr(okResult, "default");
    expect(value).toEqual(SUCCESS);

    const defaultValue = unwrapOr(errResult, "default");
    expect(defaultValue).toEqual("default");
  });

  test("unwrapOrElse()", () => {
    const fallback = (e: string) => `return error ${e}`;
    const value = unwrapOrElse(okResult, fallback);
    expect(value).toEqual(SUCCESS);

    const defaultValue = unwrapOrElse(errResult, fallback);
    expect(defaultValue).toEqual("return error fail");
  });

  test("mapErr()", () => {
    const errorFn = (e: string) => e.length;
    const value = mapErr(okResult, errorFn);
    expect(value).toHaveProperty("value", SUCCESS);

    const error = mapErr(errResult, errorFn);
    expect(error).toHaveProperty("error", FAIL.length);
  });

  test("map()", () => {
    const mapFn = (value: string) => value.split("");
    const result = map(okResult, mapFn);

    // @ts-expect-error
    expect(result.value).toHaveLength(SUCCESS.length);
    expect(result).toHaveProperty("value", SUCCESS.split(""));

    const error = map(errResult, mapFn);
    expect(error).toHaveProperty("error", FAIL);
  });
});

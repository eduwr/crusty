// src/index.ts
var ok = (value) => ({
  ok: true,
  value
});
var err = (error) => ({
  ok: false,
  error
});
var isOk = (result) => {
  return result.ok === true;
};
var isErr = (result) => {
  return result.ok === false;
};
var unwrap = (result) => {
  if (result.ok) {
    return result.value;
  }
  throw new Error("not possible to unwrap Err value");
};
var unwrapOr = (result, defaultValue) => {
  return result.ok ? result.value : defaultValue;
};
var unwrapOrElse = (result, fallback) => {
  return result.ok ? result.value : fallback(result.error);
};
var mapErr = (result, fn) => {
  return result.ok ? result : err(fn(result.error));
};
var map = (result, fn) => {
  return result.ok ? ok(fn(result.value)) : result;
};
export {
  err,
  isErr,
  isOk,
  map,
  mapErr,
  ok,
  unwrap,
  unwrapOr,
  unwrapOrElse
};
//# sourceMappingURL=index.mjs.map
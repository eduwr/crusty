"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  err: () => err,
  isErr: () => isErr,
  isOk: () => isOk,
  map: () => map,
  mapErr: () => mapErr,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapOr: () => unwrapOr,
  unwrapOrElse: () => unwrapOrElse
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  err,
  isErr,
  isOk,
  map,
  mapErr,
  ok,
  unwrap,
  unwrapOr,
  unwrapOrElse
});
//# sourceMappingURL=index.js.map
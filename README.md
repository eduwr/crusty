# Crusty - Rust-like error handling

A simple and type-safe utility for handling success and error values in TypeScript. This package provides a `Result` type, inspired by Rust's `Result`, for representing computations that can either succeed or fail. 

## Features

- ✅ **Type-safe handling of success (`Ok`) and error (`Err`) cases**
- 🚀 **Helper functions for working with results**
- 💡 **Clear and expressive error handling**

## Installation

Install the package using npm:

```bash
npm install crusty
```

Or with yarn:

```bash
yarn add crusty
```

## Usage

### Basic Types

The `Result` type is a union of two cases:

- `Ok<T>`: Represents a successful outcome with a value of type `T`.
- `Err<E>`: Represents a failure with an error of type `E`.

```typescript
type Ok<T> = {
  readonly ok: true;
  readonly value: T;
};

type Err<E> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;
```

### Creating Results

Use the `ok` and `err` functions to create `Result` instances.

```typescript
import { ok, err, Result } from 'crusty';

// Success case
const success: Result<number, string> = ok(42);

// Error case
const failure: Result<number, string> = err("Something went wrong");
```

### Checking Result Type

The utility provides `isOk` and `isErr` functions to check whether a `Result` is `Ok` or `Err`.

```typescript
import { isOk, isErr } from 'crusty';

if (isOk(success)) {
  console.log("Success:", success.value);
} else if (isErr(failure)) {
  console.error("Error:", failure.error);
}
```

### Unwrapping Results

Safely extract the value from an `Ok` result or handle an `Err` with fallback options:

- `unwrap`: Extracts the value from `Ok`, throws an error if it's an `Err`.
- `unwrapOr`: Provides a default value if the result is `Err`.
- `unwrapOrElse`: Calls a fallback function if the result is `Err`.

```typescript
import { unwrap, unwrapOr, unwrapOrElse } from 'crusty';

const value = unwrap(success); // 42
const defaultValue = unwrapOr(failure, 0); // 0
const calculatedValue = unwrapOrElse(failure, (err) => err.length); // 19 (length of "Something went wrong")
```

### Mapping Results

Transform `Result` values with `map` and `mapErr` functions.

- `map`: Applies a function to the value of an `Ok` result.
- `mapErr`: Applies a function to the error of an `Err` result.

```typescript
import { map, mapErr } from 'crusty';

const incremented = map(success, (value) => value + 1); // Ok(43)
const detailedError = mapErr(failure, (error) => `Error: ${error}`); // Err("Error: Something went wrong")
```

## API Reference

### `ok<T>(value: T): Result<T, never>`

Creates a successful `Result` containing a value.

### `err<E>(error: E): Result<never, E>`

Creates an error `Result` containing an error.

### `isOk<T, E>(result: Result<T, E>): result is Ok<T>`

Checks if a `Result` is of type `Ok`.

### `isErr<T, E>(result: Result<T, E>): result is Err<E>`

Checks if a `Result` is of type `Err`.

### `unwrap<T, E>(result: Result<T, E>): T`

Extracts the value from an `Ok` result, throws if it's an `Err`.

### `unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T`

Returns the value of an `Ok` result, or a default value if it's an `Err`.

### `unwrapOrElse<T, E>(result: Result<T, E>, fallback: (error: E) => T): T`

Returns the value of an `Ok` result, or the result of the fallback function if it's an `Err`.

### `map<T, E, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>`

Transforms the value of an `Ok` result, or returns the original `Err`.

### `mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>`

Transforms the error of an `Err` result, or returns the original `Ok`.

## Example

```typescript
import { ok, err, Result, isOk, unwrapOr } from 'crusty';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err("Cannot divide by zero");
  }
  return ok(a / b);
}

const result = divide(10, 0);

if (isOk(result)) {
  console.log("Result:", result.value);
} else {
  console.error("Error:", unwrapOr(result, "An unknown error occurred"));
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This package is open source and available under the [MIT License](LICENSE).


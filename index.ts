type Ok<T> = {
  readonly ok: true;
  readonly value: T;
};

type Err<E> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
});

export const err = <E>(error: E): Result<never, E> => ({
  ok: false,
  error,
});

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => {
  return result.ok === true;
};

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => {
  return result.ok === false;
};

export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (result.ok) {
    return result.value;
  }
  throw new Error("not possible to unwrap Err value");
};

export const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T => {
  return result.ok ? result.value : defaultValue;
};

export const unwrapOrElse = <T, E>(
  result: Result<T, E>,
  fallback: (error: E) => T,
): T => {
  return result.ok ? result.value : fallback(result.error);
};

export const mapErr = <T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> => {
  return result.ok ? result : err(fn(result.error));
};

export const map = <T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> => {
  return result.ok ? ok(fn(result.value)) : result;
};

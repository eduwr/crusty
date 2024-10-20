type Ok<T> = {
    readonly ok: true;
    readonly value: T;
};
type Err<E> = {
    readonly ok: false;
    readonly error: E;
};
type Result<T, E> = Ok<T> | Err<E>;
declare const ok: <T>(value: T) => Result<T, never>;
declare const err: <E>(error: E) => Result<never, E>;
declare const isOk: <T, E>(result: Result<T, E>) => result is Ok<T>;
declare const isErr: <T, E>(result: Result<T, E>) => result is Err<E>;
declare const unwrap: <T, E>(result: Result<T, E>) => T;
declare const unwrapOr: <T, E>(result: Result<T, E>, defaultValue: T) => T;
declare const unwrapOrElse: <T, E>(result: Result<T, E>, fallback: (error: E) => T) => T;
declare const mapErr: <T, E, F>(result: Result<T, E>, fn: (error: E) => F) => Result<T, F>;
declare const map: <T, E, U>(result: Result<T, E>, fn: (value: T) => U) => Result<U, E>;

export { type Result, err, isErr, isOk, map, mapErr, ok, unwrap, unwrapOr, unwrapOrElse };

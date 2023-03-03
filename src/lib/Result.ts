export type Result<T, E> = (
  | { ok: true; value: T }
  | { ok: false; error: E }
) & { unwrap: () => T | null };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value, unwrap: () => value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error, unwrap: () => null };
}

const endSymbol = Symbol('pForever.end')
/**
 * Run promise-returning & async functions until you end it.
 *
 * @param function_ - Receives the previously returned value. If a `Promise` is returned, it's awaited before calling `fn` again.
 * @param initialValue - Initial value to pass to `fn`.
 * @returns Fulfills when `fn` returns `pForever.end`, or rejects if any of the promises returned from `fn` rejects.
 *
 * @example
  ```
  import pForever from './pForever';
 
  pForever(async index => {
    index++;
 
    if (index > 100) {
      return pForever.end;
    }
 
    await createFixture(index);
 
    return index;
  }, 0);
  ```
 */
export async function pForever<T>(
  function_: (
    previousValue: T
  ) => PromiseLike<T | typeof pForever.end | typeof pForever.end>,
  initialValue: T | PromiseLike<T>,
): Promise<void> {
  const newValue = await function_(await initialValue)

  if (newValue === endSymbol)
    return

  return pForever(function_, newValue)
};

pForever.end = endSymbol

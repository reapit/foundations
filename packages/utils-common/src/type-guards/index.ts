type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T

export const isTruthy = <TValue>(value: TValue): value is Truthy<TValue> => {
  return Boolean(value)
}

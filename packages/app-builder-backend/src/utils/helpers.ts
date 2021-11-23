export const notEmpty = <TValue>(value?: TValue | null): value is TValue => {
  return value !== null && value !== undefined
}

export const BooleanToYesNo: (value: boolean) => string = value => {
  if (value) {
    return 'Yes'
  }

  return 'No'
}

export const convertBooleanToYesNoString: (value: boolean) => string = (value) => {
  if (value) {
    return 'Yes'
  }

  return 'No'
}

function requiredValidator() {
  return function required(value: any) {
    return (value !== undefined && value !== null && value !== '') || 'This field is required'
  }
}

function phoneNumberValidator() {
  return function email(value: any) {
    return (value && !!value.match(/^\d+$/)) || 'Please enter a valid phone number'
  }
}

export { requiredValidator, phoneNumberValidator }

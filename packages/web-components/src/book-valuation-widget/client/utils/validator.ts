export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const validateRequiredField = (value: string) => {
  return value !== undefined && value !== null && value !== ''
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const re = /^\d+$/
  return re.test(phoneNumber)
}

const invalidValues = {
  UNDEFINED_LATLNG_NUMBER: 9999,
  UNDEFINED_NULL_STRING: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 36),
}

export default invalidValues

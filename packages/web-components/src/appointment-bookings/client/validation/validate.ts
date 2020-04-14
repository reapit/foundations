function buildValidator(validators: any) {
  return function validate(value: any, dirty: boolean) {
    if (!validators || validators.length === 0) {
      return { dirty, valid: true, message: null }
    }

    const failing = validators.find((v: any) => v(value) !== true)

    return {
      dirty,
      valid: !failing,
      message: failing ? failing(value) : null,
    }
  }
}

export { buildValidator }

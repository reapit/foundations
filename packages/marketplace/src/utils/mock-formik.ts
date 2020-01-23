export const mockFormikAction = {
  setStatus: jest.fn(),
  setError: jest.fn(),
  setErrors: jest.fn(),
  setSubmitting: jest.fn(),
  setTouched: jest.fn(),
  setValues: jest.fn(),
  setFieldValue: jest.fn(),
  setFieldError: jest.fn(),
  setFieldTouched: jest.fn(),
  validateForm: jest.fn(),
  validateField: jest.fn(),
  resetForm: jest.fn(),
  submitForm: jest.fn(),
  setFormikState: jest.fn()
}

export const mockFormikSharedConfig = {
  validateOnChange: true,
  validateOnBlur: true,
  isInitialValid: true,
  enableReinitialize: true
}

export const mockFormikState = values => ({
  values,
  error: {},
  errors: {},
  touched: {},
  isValidating: true,
  isSubmitting: true,
  status: {},
  submitCount: 1
})

export const mockFormikHandler = {
  handleSubmit: jest.fn(),
  handleReset: jest.fn(),
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  getFieldProps: jest.fn(),
  getFieldMeta: jest.fn()
}

export const mockFormikComputeProps = values => ({
  dirty: true,
  isValid: true,
  initialValues: values,
  value: '123',
  error: '',
  touched: false,
  initialTouched: false,
  initialErrors: ''
})

export const mockFormikRegistration = {
  registerField: jest.fn(),
  unregisterField: jest.fn()
}

export const mockWithFormik = values => ({
  ...mockFormikAction,
  ...mockFormikSharedConfig,
  ...mockFormikState(values),
  ...mockFormikHandler,
  ...mockFormikComputeProps(values),
  ...mockFormikRegistration
})

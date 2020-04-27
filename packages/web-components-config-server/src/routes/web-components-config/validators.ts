export const ALL_PARAMS = ['customerId', 'appointmentLength', 'appointmentTimeGap', 'appointmentTypes', 'negotiatorIds']
export const GET_BY_ID_REQUIRED_PARAMS = ['customerId']
export const CREATE_REQUIRED_PARAMS = [
  'customerId',
  'appointmentLength',
  'appointmentTimeGap',
  'appointmentTypes',
  'negotiatorIds',
]
export const UPDATE_REQUIRED_PARAMS = ['customerId']
export const DELETE_REQUIRED_PARAMS = ['customerId']

export const validateGetById = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)
  const isParamsValid =
    dataKeys.some(key => GET_BY_ID_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  return isParamsValid
}

export const validateCreate = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)
  const isParamsValid =
    dataKeys.every(key => CREATE_REQUIRED_PARAMS.includes(key)) && dataKeys.length === CREATE_REQUIRED_PARAMS.length
  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  return isParamsValid
}

export const validateUpdate = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)
  const isParamsValid =
    dataKeys.some(key => UPDATE_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  return isParamsValid
}

export const validateDelete = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)
  const isParamsValid =
    dataKeys.some(key => GET_BY_ID_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  return isParamsValid
}

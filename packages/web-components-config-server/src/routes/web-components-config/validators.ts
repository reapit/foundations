export const ALL_PARAMS = [
  'customerId',
  'appointmentLength',
  'appointmentTimeGap',
  'appointmentTypes',
  'negotiatorIds',
  'daysOfWeek',
]
export const GET_BY_ID_REQUIRED_PARAMS = ['customerId']
export const CREATE_REQUIRED_PARAMS = [
  'customerId',
  'appointmentLength',
  'appointmentTimeGap',
  'appointmentTypes',
  'negotiatorIds',
  'daysOfWeek',
]
export const UPDATE_REQUIRED_PARAMS = ['customerId']
export const DELETE_REQUIRED_PARAMS = ['customerId']

/**
 * Used to validate if the data object follow our schema type
 * return false if valid
 * return error message if invalid
 */
export const validateFollowSchema = (data: { [key: string]: any }): false | string => {
  let invalidMessage = ''
  Object.keys(data).forEach(key => {
    switch (key) {
      case 'daysOfWeek': {
        const isValid = Array.isArray(data[key]) && data[key].every(day => day >= 0 && day <= 6)
        if (!isValid) {
          invalidMessage += 'Invalid daysOfWeek.'
        }
        break
      }
      // TODO validate other fields here
      default:
        break
    }
  })
  // if invalidMessage is empty string, then it's valid
  return invalidMessage === '' ? false : invalidMessage
}

export const validateGetById = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.some(key => GET_BY_ID_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  // check if param is a valid schema item
  const errorMessage = validateFollowSchema(data)

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  if (errorMessage) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = errorMessage
    error.code = '400'
    throw error
  }

  return true
}

export const validateCreate = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.every(key => CREATE_REQUIRED_PARAMS.includes(key)) && dataKeys.length === CREATE_REQUIRED_PARAMS.length
  // check if param is a valid schema item
  const errorMessage = validateFollowSchema(data)

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  if (errorMessage) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = errorMessage
    error.code = '400'
    throw error
  }

  return true
}

export const validateUpdate = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.some(key => UPDATE_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  // check if param is a valid schema item
  const errorMessage = validateFollowSchema(data)

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  if (errorMessage) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = errorMessage
    error.code = '400'
    throw error
  }

  return true
}

export const validateDelete = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.some(key => GET_BY_ID_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  // check if param is a valid schema item
  const errorMessage = validateFollowSchema(data)

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  if (errorMessage) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = errorMessage
    error.code = '400'
    throw error
  }

  return true
}

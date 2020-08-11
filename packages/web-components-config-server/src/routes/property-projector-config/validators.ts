export const ALL_PARAMS = [
  'customerId',
  'appId',
  'appointmentLength',
  'appointmentTimeGap',
  'appointmentTypes',
  'negotiatorIds',
  'daysOfWeek',
]
export const GET_BY_ID_REQUIRED_PARAMS = ['customerId', 'appId']
export const CREATE_REQUIRED_PARAMS = [
  'customerId',
  'appId',
  'appointmentLength',
  'appointmentTimeGap',
  'appointmentTypes',
  'negotiatorIds',
  'daysOfWeek',
]
export const PATCH_REQUIRED_PARAMS = ['customerId', 'appId']
export const DELETE_REQUIRED_PARAMS = ['customerId', 'appId']


export const validateGetById = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.some(key => GET_BY_ID_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }
  
  return true
}

export const validateCreate = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)
  console.log(dataKeys)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.every(key => CREATE_REQUIRED_PARAMS.includes(key)) && dataKeys.length === CREATE_REQUIRED_PARAMS.length
  // check if param is a valid schema item

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }

  return true
}

export const validatePatch = (data: { [key: string]: any }) => {
  const dataKeys = Object.keys(data)

  // check if param keys are valid
  const isParamsValid =
    dataKeys.some(key => CREATE_REQUIRED_PARAMS.includes(key)) && dataKeys.every(key => ALL_PARAMS.includes(key))
  // check if param is a valid schema item

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
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

  if (!isParamsValid) {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    throw error
  }

  return true
}

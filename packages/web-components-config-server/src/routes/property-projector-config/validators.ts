export const ALL_PARAMS = [
  'customerId',
  'officeId',
  'logo',
  'primaryColour',
  'secondaryColour',
  'interval',
  'propertyLimit',
  'marketingMode',
  'sellingStatuses',
  'lettingStatuses',
  'minPrice',
  'maxPrice',
  'minRent',
  'maxRent',
  'showAddress',
  'sortBy',
  'departments',
  'offices',
]
export const GET_BY_ID_REQUIRED_PARAMS = ['customerId', 'officeId']
export const CREATE_REQUIRED_PARAMS = [
  'customerId',
  'officeId',
  'logo',
  'primaryColour',
  'secondaryColour',
  'interval',
  'propertyLimit',
  'marketingMode',
  'sellingStatuses',
  'lettingStatuses',
  'minPrice',
  'maxPrice',
  'minRent',
  'maxRent',
  'showAddress',
  'sortBy',
  'departments',
  'offices',
]

export const validateFollowSchema = (data: { [key: string]: any }): false | string => {
  let invalidMessage = ''
  Object.keys(data).forEach(key => {
    switch (key) {
      case 'offices': {
        const isValid = Array.isArray(data[key]) && data[key].every(offices => offices.length === 3)
        if (!isValid) {
          invalidMessage += 'Invalid offices.'
        }
        break
      }
      case 'interval': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid interval.'
        }
        break
      }
      case 'minPrice': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid minPrice.'
        }
        break
      }
      case 'maxPrice': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid maxPrice.'
        }
        break
      }
      case 'minRent': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid minRent.'
        }
        break
      }
      case 'maxRent': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid maxRent.'
        }
        break
      }
      case 'propertyLimit': {
        const isValid = !isNaN(data[key])
        if (!isValid) {
          invalidMessage += 'Invalid propertyLimit.'
        }
        break
      }
      case 'showAddress': {
        const isValid = typeof data[key] === 'boolean'
        if (!isValid) {
          invalidMessage += 'Invalid showAddress.'
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
  console.log(dataKeys.length)
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

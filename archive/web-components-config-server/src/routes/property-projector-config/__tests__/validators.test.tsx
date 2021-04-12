import { validateGetById, validateCreate, validateFollowSchema } from '../validators'

describe('validateGetById', () => {
  it('should return correctly', () => {
    const result = validateGetById({ customerId: 'id1', officeId: 'id1' })
    expect(result).toBe(true)
  })

  it('should throw error with invalid prop', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateGetById({ customerIdFake: 'id1' })
    }).toThrowError(error)
  })

  it('should throw error with invalid param', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateGetById({ customerId: 'id1', invalidParam: 'param' })
    }).toThrowError(error)
  })
})

describe('validateCreate', () => {
  it('should return correctly', () => {
    const result = validateCreate({
      customerId: 'id1',
      officeId: 'id1',
      logo: '',
      primaryColour: '#eeeeee',
      secondaryColour: '#000000',
      headerTextColour: '#FFFFFF',
      interval: 7,
      propertyLimit: 25,
      marketingMode: ['Sales', 'Lettings'],
      sellingStatuses: ['For Sale'],
      lettingStatuses: ['To Let'],
      minPrice: 100000,
      maxPrice: 1000000,
      minRent: 500,
      maxRent: 1000,
      showAddress: false,
      sortBy: 'price',
      departments: {
        G: ['house', 'bungalow'],
      },
      offices: ['XYZ', 'RPT'],
    })
    expect(result).toBe(true)
  })

  it('should throw error with invalid param', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateCreate({
        customerId: 'id1',
        officeId: 'id1',
        InvalidParam: 'InvalidValue',
        primaryColour: '#eeeeee',
        secondaryColour: '#000000',
        headerTextColour: '#FFFFFF',
        interval: 7,
        propertyLimit: 25,
        marketingMode: ['Sales', 'Lettings'],
        sellingStatuses: ['For Sale'],
        lettingStatuses: ['To Let'],
        minPrice: 100000,
        maxPrice: 1000000,
        minRent: 500,
        maxRent: 1000,
        showAddress: false,
        sortBy: 'price',
        departments: {
          G: ['house', 'bungalow'],
        },
        offices: ['XYZ', 'RPT'],
      })
    }).toThrowError(error)
  })

  it('should throw error when not enough data', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateCreate({
        customerId: 'id1',
        officeId: 'id1',
        InvalidParam: 'InvalidValue',
        primaryColour: '#eeeeee',
        secondaryColour: '#000000',
        headerTextColour: '#FFFFFF',
        interval: 7,
        propertyLimit: 25,
        marketingMode: ['Sales', 'Lettings'],
        sellingStatuses: ['For Sale'],
      })
    }).toThrowError(error)
  })
})

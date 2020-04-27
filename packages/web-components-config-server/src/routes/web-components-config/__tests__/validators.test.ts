import { validateGetById, validateCreate, validateUpdate, validateDelete } from '../validators'

describe('validateGetById', () => {
  it('should return correctly', () => {
    const result = validateGetById({ customerId: 'id1' })
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
      appointmentLength: 10,
      appointmentTimeGap: 15,
      appointmentTypes: ['type1', 'type2'],
      negotiatorIds: ['ne1'],
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
        appointmentLength: 10,
        appointmentTimeGap: 15,
        appointmentTypes: ['type1', 'type2'],
        negotiatorIds: ['ne1'],
        invalidParam: 'param1',
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
        appointmentTimeGap: 15,
        appointmentTypes: ['type1', 'type2'],
      })
    }).toThrowError(error)
  })
})

describe('validateUpdate', () => {
  it('should return correctly', () => {
    const result = validateUpdate({ customerId: 'id1', appointmentLength: 20 })
    expect(result).toBe(true)
  })

  it('should throw error with invalid prop', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateUpdate({ customerIdFake: 'id1', appointmentLength: 20 })
    }).toThrowError(error)
  })

  it('should throw error with invalid param', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateUpdate({ customerId: 'id1', invalidParam: 'param' })
    }).toThrowError(error)
  })
})

describe('validateDelete', () => {
  it('should return correctly', () => {
    const result = validateDelete({ customerId: 'id1' })
    expect(result).toBe(true)
  })

  it('should throw error with invalid prop', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateDelete({ customerIdFake: 'id1' })
    }).toThrowError(error)
  })

  it('should throw error with invalid param', () => {
    const error: NodeJS.ErrnoException = new Error()
    error.message = 'Invalid params'
    error.code = '400'
    expect(() => {
      validateDelete({ customerId: 'id1', invalidParam: 'param' })
    }).toThrowError(error)
  })
})

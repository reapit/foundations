import {
  formatCardExpires,
  formatCardNumber,
  getCardType,
  isAmex,
  isMasterCard,
  isVisa,
  unformatCard,
  unformatCardExpires,
  validateCard,
  validateCardExpires,
  validateSecureCode,
} from '../payment-card-helpers'

const mockAmexOne = '3400 000000 00000'
const mockAmexTwo = '3700 000000 00000'
const mockVisa = '4000 0000 0000 0000'
const mockMasterOne = '5100 0000 0000 0000'
const mockMasterTwo = '2221 0000 0000 0000'
const mockWhitelistCard = '4929000000006'
const invalidCard = '0000 0000 0000 0000'

describe('isAmex', () => {
  it('should return true for a card starting 34', () => {
    expect(isAmex(mockAmexOne)).toBe(true)
  })

  it('should return true for a card starting 37', () => {
    expect(isAmex(mockAmexTwo)).toBe(true)
  })

  it('should return false for an invalid card', () => {
    expect(isAmex(invalidCard)).toBe(false)
  })
})

describe('isVisa', () => {
  it('should return true for a card starting 4', () => {
    expect(isVisa(mockVisa)).toBe(true)
  })

  it('should return false for an invalid card', () => {
    expect(isVisa(invalidCard)).toBe(false)
  })
})

describe('isMasterCard', () => {
  it('should return true for a card between 50 and 56', () => {
    expect(isMasterCard(mockMasterOne)).toBe(true)
  })

  it('should return true for a card between 2220 and 2721', () => {
    expect(isMasterCard(mockMasterTwo)).toBe(true)
  })

  it('should return false for an invalid card', () => {
    expect(isMasterCard(invalidCard)).toBe(false)
  })
})

describe('getCardType', () => {
  it('should return visa for a valid card', () => {
    expect(getCardType(mockVisa)).toEqual('visa')
  })

  it('should return mastercard for a valid card', () => {
    expect(getCardType(mockMasterOne)).toEqual('mastercard')
  })

  it('should return amex for a valid card', () => {
    expect(getCardType(mockAmexOne)).toEqual('amex')
  })

  it('should return unknown for an invalid card', () => {
    expect(getCardType(invalidCard)).toEqual('unknown')
  })
})

describe('formatCardNumber', () => {
  it('should correctly format an amex', () => {
    const raw = '340000000000000'

    expect(formatCardNumber(raw)).toEqual(mockAmexOne)
  })

  it('should correctly format a non amex', () => {
    const raw = '4000000000000000'

    expect(formatCardNumber(raw)).toEqual(mockVisa)
  })
})

describe('unformatCard', () => {
  it('should correctly unformat a card', () => {
    const unformatted = '4000000000000000'
    expect(unformatCard(mockVisa)).toEqual(unformatted)
  })
})

describe('formatCardExpires', () => {
  it('should correctly format a card expiry', () => {
    const raw = '0324'
    const expected = '03 / 24'

    expect(formatCardExpires(raw)).toEqual(expected)
  })
})

describe('unformatCardExpires', () => {
  it('should correctly unformat a card expiry', () => {
    const formatted = '03 / 24'
    const expected = '0324'
    expect(unformatCardExpires(formatted)).toEqual(expected)
  })
})

describe('validateCard', () => {
  it('should validate as required', () => {
    expect(validateCard('')).toEqual('Required')
  })

  it('should validate as not a number', () => {
    expect(validateCard('0000 abcd 0000 0000')).toEqual('Card number should be numeric characters only')
  })

  it('should validate as wrong length for amex', () => {
    expect(validateCard('3400 0000 0000')).toEqual('Card number needs to be 15 numbers to be valid')
  })

  it('should validate as wrong length for non amex', () => {
    expect(validateCard('4000 0000 0000')).toEqual('Card number needs to be 16 numbers to be valid')
  })

  it('should allow a whiteListTestCard if matches', () => {
    expect(validateCard(mockWhitelistCard)).toBeNull()
  })

  it('should allow a valid card', () => {
    expect(validateCard(mockVisa)).toBeNull()
  })
})

describe('validateSecureCode', () => {
  it('should validate as required', () => {
    expect(validateSecureCode('', 'visa')).toEqual('Required')
  })

  it('should validate as not a number', () => {
    expect(validateSecureCode('abc', 'visa')).toEqual('CSV should be numeric characters only')
  })

  it('should validate as wrong length for amex', () => {
    expect(validateSecureCode('123', 'amex')).toEqual('CSV needs to be 4 numbers to be valid')
  })

  it('should validate as wrong length for non amex', () => {
    expect(validateSecureCode('1234', 'visa')).toEqual('CSV needs to be 3 numbers to be valid')
  })

  it('should allow a valid CSV', () => {
    expect(validateSecureCode('123', 'visa')).toBeNull()
  })
})

describe('validateCardExpires', () => {
  it('should validate as required', () => {
    expect(validateCardExpires('')).toEqual('Required')
  })

  it('should validate as not a number', () => {
    expect(validateCardExpires('abc')).toEqual('Dates should be numeric characters only')
  })

  it('should validate as card expired', () => {
    expect(validateCardExpires('10 / 20')).toEqual('Card has expired')
  })

  it('should allow a valid expiry', () => {
    expect(validateCardExpires('01 / 50')).toBeNull()
  })
})

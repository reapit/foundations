import { isValidTelephone } from '../validate-telephone'

describe('isValidTelephone ', () => {
  it('should return true with valid telephone', () => {
    const telephone1 = '0689912549'
    const telephone2 = '+33698912549'
    const telephone3 = '(555)-555-5555'
    expect(isValidTelephone(telephone1)).toBe(true)
    expect(isValidTelephone(telephone2)).toBe(true)
    expect(isValidTelephone(telephone3)).toBe(true)
  })
  it('should return false with invalid telephone', () => {
    const telephone1 = 'xx-yyy-xxxxx'
    const telephone2 = '(555)-X555-5555'
    expect(isValidTelephone(telephone1)).toBe(false)
    expect(isValidTelephone(telephone2)).toBe(false)
  })
})

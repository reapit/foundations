import { convertBooleanToYesNoString } from '../boolean-to-yes-no-string'
describe('convertBooleanToYesNoString', () => {
  it('should return Yes when input true', () => {
    expect(convertBooleanToYesNoString(true)).toBe('Yes')
  })
  it('should return No when input fasle', () => {
    expect(convertBooleanToYesNoString(false)).toBe('No')
  })
})

import { BooleanToYesNo } from '../boolean-to-yes-no'
describe('BooleanToYesNo', () => {
  it('should return Yes when input true', () => {
    expect(BooleanToYesNo(true)).toBe('Yes')
  })
  it('should return No when input fasle', () => {
    expect(BooleanToYesNo(false)).toBe('No')
  })
})

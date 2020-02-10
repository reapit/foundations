import { contact } from '@/sagas/__stubs__/contact'
import { combineAdress } from '../combine-address'

describe('combineAddress', () => {
  it('should run correctly', () => {
    const result = combineAdress(contact.primaryAddress)
    const expected = '1 123 Harcourt Close Leighton Buzzard Bedfordshire 123123 LU7 2ST'
    expect(result).toEqual(expected)
  })
})

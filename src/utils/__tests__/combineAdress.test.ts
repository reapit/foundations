import { contact } from '@/sagas/__stubs__/contact'
import { combineAdress } from '../combineAddress'

describe('combineAddress', () => {
  it('should run correctly', () => {
    const result = combineAdress(contact.addresses)
    const expected = ' Tilbrook Farm Station Road Bow Brickhill Milton Keynes Buckinghamshire MK17 9JU'
    expect(result).toEqual(expected)
  })
})

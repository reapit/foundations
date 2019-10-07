import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import { combineAdress } from '../combine-address'

describe('combineAddress', () => {
  it('should run correctly', () => {
    const result = combineAdress(appointmentDataStub.property && appointmentDataStub.property.address)
    const expected = '65 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })
})

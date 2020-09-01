import { officesStub } from '../stubs/offices'
import { filterNegotiatorsIdByOffice } from '../utils'

describe('appointment planner utils', () => {
  test('filterNegotiatorsIdByOffice', () => {
    const input = ['AASD', 'ABCD', 'ABC']
    const output = ['AASD', 'ABCD']
    expect(filterNegotiatorsIdByOffice(officesStub, input)).toEqual(output)
  })
})

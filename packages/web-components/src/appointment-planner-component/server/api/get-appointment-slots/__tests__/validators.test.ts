import { validateGetAppointmentSlotsRequest, errorFieldRequiredInRequestProperty } from '../validators'
import { AppRequest } from '../../../../../../../utils/src/node/logger'

describe('get-appointment-slots validators', () => {
  describe('errorFieldRequiredInRequestProperty', () => {
    const testValues = ['', ' ', 1]

    for (let testValue of testValues) {
      test(`return err string when there is error. val: ${testValue}`, () => {
        const req = ({ query: { postcode: testValue } } as unknown) as AppRequest
        expect(validateGetAppointmentSlotsRequest(req)).toBe(errorFieldRequiredInRequestProperty('postcode', 'query'))
      })
    }

    it('return null when there is no error', () => {
      const req = ({
        query: {
          postcode: 'abc',
          dateFrom: 'abc',
          dateTo: 'abc',
        },
        headers: {
          'reapit-customer': 'abc',
        },
      } as unknown) as AppRequest
      expect(validateGetAppointmentSlotsRequest(req)).toBe(null)
    })
  })
  test('errorFieldRequiredInRequestProperty', () => {})
})

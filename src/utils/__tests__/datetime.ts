import { getTime } from '../datetime'

describe('datetime', () => {
  it('getTime', async () => {
    ;[
      [1567087063450, '01:57 PM', '13:57'],
      ['Fri, 30 Aug 2019 17:44:20', '05:44 PM', '17:44'],
      ['2019-07-05T00:37:40.220Z', '12:37 AM', '00:37']
    ].forEach(([input, expected, expectedFor24h]) => {
      expect(getTime(input)).toBe(expected)
      expect(getTime(input, true)).toBe(expectedFor24h)
    })
  })
})

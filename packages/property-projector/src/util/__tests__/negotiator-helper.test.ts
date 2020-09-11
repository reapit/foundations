import { getNegotiatorOfficeId } from '../negotiator-helper'
import { mockBrowserSession } from '@/platform-api/__mocks__/session'

jest.mock('@/platform-api/negotiators-api', () => {
  return {
    getNegotiators: jest.fn(() =>
      Promise.resolve({
        _embedded: [
          {
            officeId: 'TST',
          },
        ],
      }),
    ),
  }
})

describe('getNegotiatorOfficeId', () => {
  it('should return an office id', async () => {
    expect(await getNegotiatorOfficeId(mockBrowserSession)).toEqual('TST')
  })
})

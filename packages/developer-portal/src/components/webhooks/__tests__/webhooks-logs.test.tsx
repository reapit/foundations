import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockWebhookLogs } from '../../../tests/__stubs__/webhooks'
import { useWebhooksState } from '../state/use-webhooks-state'
import { mockWebhooksState } from '../state/__mocks__/use-webhooks-state'
import { WebhooksLogs } from '../webhooks-logs'

jest.mock('../state/use-webhooks-state')

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockWebhookLogs, false, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock
const mockUseWebhooksState = useWebhooksState as jest.Mock

describe('WebhooksLogs', () => {
  it('should match a snapshot where there are subscriptions', () => {
    mockUseWebhooksState.mockReturnValue({
      ...mockWebhooksState,
      webhooksFilterState: {
        ...mockWebhooksState.webhooksFilterState,
        applicationId: 'MOCK_ID',
      },
    })
    expect(render(<WebhooksLogs />)).toMatchSnapshot()
  })

  it('should match a snapshot where loading', () => {
    mockUseWebhooksState.mockReturnValue({
      ...mockWebhooksState,
      webhooksFilterState: {
        ...mockWebhooksState.webhooksFilterState,
        applicationId: 'MOCK_ID',
      },
    })
    mockUseReapitGet.mockReturnValue([null, true, undefined, jest.fn()])
    expect(render(<WebhooksLogs />)).toMatchSnapshot()
  })

  it('should match a snapshot where no data', () => {
    mockUseWebhooksState.mockReturnValue({
      ...mockWebhooksState,
      webhooksFilterState: {
        ...mockWebhooksState.webhooksFilterState,
        applicationId: 'MOCK_ID',
      },
    })
    mockUseReapitGet.mockReturnValue([[], false, undefined, jest.fn()])
    expect(render(<WebhooksLogs />)).toMatchSnapshot()
  })

  it('should match a snapshot where no appId', () => {
    mockUseWebhooksState.mockReturnValue(mockWebhooksState)
    mockUseReapitGet.mockReturnValue([null, false, undefined, jest.fn()])
    expect(render(<WebhooksLogs />)).toMatchSnapshot()
  })
})

import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockWebhookModelPagedResult } from '../../../tests/__stubs__/webhooks'
import { useWebhooksState } from '../state/use-webhooks-state'
import { mockWebhooksState } from '../state/__mocks__/use-webhooks-state'
import { WebhooksManage } from '../webhooks-manage'

jest.mock('../state/use-webhooks-state')

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockWebhookModelPagedResult, false, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock
const mockUseWebhooksState = useWebhooksState as jest.Mock

describe('WebhooksManage', () => {
  it('should match a snapshot where there are subscriptions', () => {
    mockUseWebhooksState.mockReturnValue({
      ...mockWebhooksState,
      webhooksFilterState: {
        ...mockWebhooksState.webhooksFilterState,
        applicationId: 'MOCK_ID',
      },
    })
    expect(render(<WebhooksManage />)).toMatchSnapshot()
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
    expect(render(<WebhooksManage />)).toMatchSnapshot()
  })

  it('should match a snapshot where no data', () => {
    mockUseWebhooksState.mockReturnValue({
      ...mockWebhooksState,
      webhooksFilterState: {
        ...mockWebhooksState.webhooksFilterState,
        applicationId: 'MOCK_ID',
      },
    })
    mockUseReapitGet.mockReturnValue([{}, false, undefined, jest.fn()])
    expect(render(<WebhooksManage />)).toMatchSnapshot()
  })

  it('should match a snapshot where no appId', () => {
    mockUseWebhooksState.mockReturnValue(mockWebhooksState)
    mockUseReapitGet.mockReturnValue([{}, false, undefined, jest.fn()])
    expect(render(<WebhooksManage />)).toMatchSnapshot()
  })
})

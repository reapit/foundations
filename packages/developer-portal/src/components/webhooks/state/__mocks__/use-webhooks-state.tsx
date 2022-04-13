import { mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'
import { mockTopicModelPagedResult } from '../../../../tests/__stubs__/webhooks'
import { defaultWebhooksFilterState } from '../defaults'

export const mockWebhooksState = {
  webhooksDataState: {
    apps: mockAppSummaryModelPagedResult,
    topics: mockTopicModelPagedResult,
    installations: mockInstallationModelPagedResult,
  },
  webhooksFilterState: defaultWebhooksFilterState,
}

export const useWebhooksState = jest.fn(() => mockWebhooksState)

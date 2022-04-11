import { mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'
import { defaultAnalyticsFilterState } from '../defaults'

export const mockAnalyticsState = {
  analyticsDataState: {
    apps: mockAppSummaryModelPagedResult,
  },
  analyticsFilterState: defaultAnalyticsFilterState,
}

export const useAnalyticsState = jest.fn(() => mockAnalyticsState)

import { defaultAnalyticsFilterState } from '../defaults'

export const mockAnalyticsState = {
  analyticsDataState: {},
  analyticsFilterState: defaultAnalyticsFilterState,
}

export const useAnalyticsState = jest.fn(() => mockAnalyticsState)

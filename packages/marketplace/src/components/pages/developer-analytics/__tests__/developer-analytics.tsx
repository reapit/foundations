import * as React from 'react'
import { shallow } from 'enzyme'

import { tabConfigs } from '../developer-analytics'
import AnalyticsPage from '../developer-analytics'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({ replace: jest.fn() }),
  useRouteMatch: () => ({
    url: null,
  }),
}))

describe('AnalyticsPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AnalyticsPage />)).toMatchSnapshot()
  })
  describe('tabConfigs', () => {
    it('should run correctly on prod env', () => {
      if (window.reapit.config.appEnv === 'production') {
        const mockedCurrentUrl = 'url'
        const history = {
          push: jest.fn(),
        }
        const result = tabConfigs({ currentUrl: mockedCurrentUrl, history })
        // Expect columns to have length 1 because we temporarily hide the Billing tab on Prod
        expect(result).toHaveLength(1)
      }
    })
    it('should run correctly on other env', () => {
      if (window.reapit.config.appEnv !== 'production') {
        const mockedCurrentUrl = 'url'
        const history = {
          push: jest.fn(),
        }
        const result = tabConfigs({ currentUrl: mockedCurrentUrl, history })
        expect(result).toHaveLength(2)
      }
    })
  })
})

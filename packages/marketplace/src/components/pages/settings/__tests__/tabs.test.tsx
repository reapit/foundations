import * as React from 'react'
import { shallow } from 'enzyme'

import { Tabs, tabConfigs } from '../tabs'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({ replace: jest.fn() }),
  useRouteMatch: () => ({ url: 'test' }),
}))

describe('Tabs', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Tabs />)).toMatchSnapshot()
  })
  describe('tabConfigs', () => {
    it('should run correctly ', () => {
      if (window.reapit.config.appEnv === 'production') {
        const history = {
          push: jest.fn(),
        }
        const result = tabConfigs({ currentUrl: 'test', history })
        // Expect columns to have length 1 because we temporarily hide the Billing tab on Prod
        expect(result).toHaveLength(3)
      }
    })
  })
})

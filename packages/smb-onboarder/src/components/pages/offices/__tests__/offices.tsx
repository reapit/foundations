import * as React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Offices,
  OfficesProps,
  getTabConfigs,
  createHandleChangeTabFn,
  createGetTabConfigsFn,
  GetTabConfigs,
} from '../offices'
import Routes from '@/constants/routes'
import { History } from 'history'

import AreasTab from '@/components/ui/areas-tab'
import GlobalSettingsTab from '@/components/ui/global-settings-tab'
import IntegrationsTab from '@/components/ui/integration-tab'
import OfficesTab from '@/components/ui/offices-tab'

describe('Page Offices Component', () => {
  describe('Offices', () => {
    test('fn created by createHandleChangeTabFn should run correctly', () => {
      const mockedHistory = {
        push: jest.fn(),
      }
      const mockedPath = '/abc'
      createHandleChangeTabFn((mockedHistory as unknown) as History)(mockedPath)
      expect(mockedHistory.push).toHaveBeenCalledWith(mockedPath)
    })

    test('fn created by createGetTabConfigsFn should run correctly', () => {
      const handleChangeTab = () => {}
      const getTabConfigs = jest.fn(() => true)
      const pathname = 'abc'

      expect(
        createGetTabConfigsFn({
          handleChangeTab,
          getTabConfigs: (getTabConfigs as unknown) as GetTabConfigs,
          pathname,
        })(),
      ).toBe(true)

      expect(getTabConfigs).toHaveBeenCalledWith({
        handleChangeTab,
        officesUrlPart: Routes.OFFICES,
        currentBrowserUrl: 'abc',
      })
    })

    it('should match a snapshot', () => {
      const mockProps: OfficesProps = {}
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[]} addTypename={true}>
            <Offices {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('getTabConfigs', () => {
    it('should generate tab configs correctly', () => {
      const mockedHandleTabChange = jest.fn()
      const officesUrlPart = '/offices'
      const currentBrowserUrl = '/offices/areas'

      const tabConfigs = getTabConfigs({ handleChangeTab: mockedHandleTabChange, officesUrlPart, currentBrowserUrl })

      expect(tabConfigs).toMatchObject([
        {
          tabIdentifier: 'offices',
          displayText: 'Offices',
          Component: OfficesTab,
          active: false,
          path: '/offices/',
        },
        {
          tabIdentifier: 'areas',
          displayText: 'Areas',
          Component: AreasTab,
          active: true,
          path: '/offices/areas',
        },
        {
          tabIdentifier: 'globalSettings',
          displayText: 'Global Settings',
          path: '/offices/globalsettings',
          Component: GlobalSettingsTab,
          active: false,
        },
        {
          tabIdentifier: 'integrations',
          displayText: 'Integrations',
          path: '/offices/integrations',
          Component: IntegrationsTab,
          active: false,
        },
      ])

      tabConfigs[0].onTabClick('')
      expect(mockedHandleTabChange).toHaveBeenCalledWith('/offices/')
    })
  })
})

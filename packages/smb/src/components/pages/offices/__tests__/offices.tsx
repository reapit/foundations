import * as React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import { Offices, OfficesProps, getTabConfigs } from '../offices'

import AreasTab from '@/components/ui/areas-tab'
import GlobalSettingsTab from '@/components/ui/global-settings-tab'
import IntegrationsTab from '@/components/ui/integration-tab'
import OfficesTab from '@/components/ui/offices-tab'

describe('Page Offices Component', () => {
  describe('Offices', () => {
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

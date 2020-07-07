import * as React from 'react'
import { shallow } from 'enzyme'

import {
  FilterBar,
  FilterBarProps,
  prepareAppDeveloperAppData,
  prepareClientIds,
  handleUseCallbackToPrepareFilterFormInitialValues,
  lastMonday,
  lastSunday,
} from '../filter-bar'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { SANDBOX_CLIENT_ID } from '../../../../../../constants/api'

const mockProps: FilterBarProps = {
  developerAppsData: appsDataStub.data,
  installationAppDataArray: installationsStub.data || [],
}

describe('FilterBar', () => {
  it('should match a snapshot', () => {
    expect(shallow(<FilterBar {...mockProps} />)).toMatchSnapshot()
  })
  describe('prepareAppDeveloperAppData', () => {
    it('should run correctly', () => {
      const { developerAppsData } = mockProps
      const { developerApps, developerAppIds } = prepareAppDeveloperAppData(developerAppsData)
      expect(developerApps).toEqual(developerAppsData.data)
      expect(developerAppIds).toEqual(['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'])
    })
  })
  describe('prepareClientIds', () => {
    it('should run correctly', () => {
      const { installationAppDataArray } = mockProps
      const clientIds = prepareClientIds(installationAppDataArray)
      expect(clientIds).toEqual([SANDBOX_CLIENT_ID, 'DXX'])
    })
  })
  describe('handleUseCallbackToPrepareFilterFormInitialValues', () => {
    it('should run correctly', () => {
      const fn = handleUseCallbackToPrepareFilterFormInitialValues(lastMonday, lastSunday)
      const initialValues = fn()
      expect(initialValues).toEqual({
        dateFrom: lastMonday,
        dateTo: lastSunday,
        clientId: '',
        appId: '',
      })
    })
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'

import {
  FilterBar,
  FilterBarProps,
  prepareAppDeveloperAppData,
  handleUseCallbackToPrepareFilterFormInitialValues,
} from '../filter-bar'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { prepareDefaultFilterDateParams } from '../default-filter-group'
import { mockAppSummaryModelPagedResult } from '../../../../../../tests/__stubs__/apps'

const mockProps: FilterBarProps = {
  developerAppsData: mockAppSummaryModelPagedResult.data ?? [],
  installationAppDataArray: installationsStub.data ?? [],
}

describe('FilterBar', () => {
  it('should match a snapshot', () => {
    expect(shallow(<FilterBar {...mockProps} />)).toMatchSnapshot()
  })
  describe('prepareAppDeveloperAppData', () => {
    it('should run correctly', () => {
      const { developerAppsData } = mockProps
      const { developerApps, developerAppIds } = prepareAppDeveloperAppData(developerAppsData)
      expect(developerApps).toEqual(developerAppsData)
      expect(developerAppIds).toEqual(['MOCK_APP_ID', 'MOCK_OTHER_APP_ID'])
    })
  })
  describe('handleUseCallbackToPrepareFilterFormInitialValues', () => {
    it('should run correctly', () => {
      const { defaultParams } = prepareDefaultFilterDateParams()
      const fn = handleUseCallbackToPrepareFilterFormInitialValues(defaultParams.dateFrom, defaultParams.dateFrom)
      const initialValues = fn()
      expect(initialValues).toEqual({
        dateFrom: defaultParams.dateFrom,
        dateTo: defaultParams.dateFrom,
        clientId: '',
        appId: '',
      })
    })
  })
})

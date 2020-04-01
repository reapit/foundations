import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import {
  FilterForm,
  FilterFormProps,
  renderAppSelectOptions,
  renderClientSelectOptions,
  handleAutoSave,
} from '../filter-form'
import { appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { appsDataStub } from '@/sagas/__stubs__/apps'

const mockProps: FilterFormProps = {
  initialValues: {
    dateFrom: '2020-03-23',
    dateTo: '2020-03-29',
    clientId: '',
    appId: '',
  },
  clientIds: ['DXX'],
  developerApps: appsDataStub.data.data || [],
}

describe('FilterForm', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore({})
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <FilterForm {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleAutoSave', () => {
    it('should run correctly', () => {
      const { developerApps, clientIds } = mockProps
      const mockFormValues = {
        dateFrom: '2020-03-23',
        dateTo: '2020-03-29',
        clientId: '',
        appId: '',
      }
      const fn = handleAutoSave(developerApps, clientIds, spyDispatch)
      fn(mockFormValues)

      expect(spyDispatch).toBeCalledWith(
        appUsageStatsRequestData({
          ...mockFormValues,
          appId: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
        }),
      )

      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestData({
          appId: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
          clientId: ['DXX'],
          pageSize: GET_ALL_PAGE_SIZE,
          installedDateFrom: mockFormValues.dateFrom,
          installedDateTo: mockFormValues.dateTo,
        }),
      )
    })

    it('should run correctly', () => {
      const { developerApps, clientIds } = mockProps
      const mockFormValues = {
        dateFrom: '2020-03-23',
        dateTo: '2020-03-29',
        clientId: ['testClientId'],
        appId: ['testAppId'],
      }
      const fn = handleAutoSave(developerApps, clientIds, spyDispatch)
      fn(mockFormValues)

      expect(spyDispatch).toBeCalledWith(
        appUsageStatsRequestData({
          ...mockFormValues,
          appId: mockFormValues.appId,
        }),
      )

      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestData({
          appId: mockFormValues.appId,
          clientId: mockFormValues.clientId,
          pageSize: GET_ALL_PAGE_SIZE,
          installedDateFrom: mockFormValues.dateFrom,
          installedDateTo: mockFormValues.dateTo,
        }),
      )
    })
  })

  describe('renderAppSelectOptions', () => {
    it('should run correctly', () => {
      const { developerApps } = mockProps
      const appSelectOptions = renderAppSelectOptions(developerApps)
      expect(appSelectOptions).toEqual([
        {
          label: 'All',
          value: '',
        },
        {
          label: 'test',
          value: '09043eb8-9e5e-4650-b7f1-f0cb62699027',
        },
        {
          label: 'asd',
          value: '261da083-cee2-4f5c-a18f-8f9375f1f5af',
        },
      ])
    })
  })
  describe('renderClientSelectOptions', () => {
    it('should run correctly', () => {
      const { clientIds } = mockProps
      const clientOptions = renderClientSelectOptions(clientIds)
      expect(clientOptions).toEqual([
        {
          label: 'All',
          value: '',
        },
        {
          label: 'DXX',
          value: 'DXX',
        },
      ])
    })
  })
})

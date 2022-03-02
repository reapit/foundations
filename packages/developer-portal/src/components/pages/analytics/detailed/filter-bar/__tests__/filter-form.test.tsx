import * as React from 'react'
import dayjs from 'dayjs'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import {
  FilterForm,
  FilterFormProps,
  renderAppSelectOptions,
  renderClientSelectOptions,
  handleAutoSave,
} from '../filter-form'
import { fetchInstallationsFilterList } from '@/actions/installations'
import { fetchTrafficStatistics } from '@/actions/traffic-statistics'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import { SANDBOX_CLIENT_ID, SANDBOX_CLIENT_NAME } from '@/constants/api'
import { mockAppSummaryModelPagedResult } from '../../../../../../tests/__stubs__/apps'

const mockProps: FilterFormProps = {
  initialValues: {
    dateFrom: '2020-03-23',
    dateTo: '2020-03-29',
    clientId: '',
    appId: '',
  },
  installationAppDataArray: [{ customerId: 'DXX', customerName: 'DXX' }],
  developerApps: mockAppSummaryModelPagedResult.data ?? [],
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
      const { developerApps, installationAppDataArray } = mockProps
      const mockFormValues = {
        dateFrom: '2020-03-23',
        dateTo: '2020-03-29',
        clientId: '',
        appId: '',
      }
      const fn = handleAutoSave(developerApps, installationAppDataArray, spyDispatch)
      fn(mockFormValues)

      expect(spyDispatch).toBeCalledWith(
        fetchInstallationsFilterList({
          appId: ['MOCK_APP_ID', 'MOCK_OTHER_APP_ID'],
          clientId: ['DXX'],
          pageSize: GET_ALL_PAGE_SIZE,
          installedDateFrom: dayjs(mockFormValues.dateFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD),
          installedDateTo: dayjs(mockFormValues.dateTo).format(DATE_TIME_FORMAT.YYYY_MM_DD),
        }),
      )

      expect(spyDispatch).toBeCalledWith(
        fetchTrafficStatistics({
          applicationId: ['MOCK_APP_ID', 'MOCK_OTHER_APP_ID'],
          customerId: ['DXX'],
          dateFrom: dayjs(mockFormValues.dateFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD),
          dateTo: dayjs(mockFormValues.dateTo).format(DATE_TIME_FORMAT.YYYY_MM_DD),
        }),
      )
    })

    it('should run correctly', () => {
      const { developerApps, installationAppDataArray } = mockProps
      const mockFormValues = {
        dateFrom: '2020-03-23',
        dateTo: '2020-03-29',
        clientId: 'testClientId',
        appId: ['testAppId'],
      }
      const fn = handleAutoSave(developerApps, installationAppDataArray, spyDispatch)
      fn(mockFormValues)

      expect(spyDispatch).toBeCalledWith(
        fetchInstallationsFilterList({
          appId: mockFormValues.appId,
          clientId: ['testClientId'],
          pageSize: GET_ALL_PAGE_SIZE,
          installedDateFrom: dayjs(mockFormValues.dateFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD),
          installedDateTo: dayjs(mockFormValues.dateTo).format(DATE_TIME_FORMAT.YYYY_MM_DD),
        }),
      )

      expect(spyDispatch).toBeCalledWith(
        fetchTrafficStatistics({
          applicationId: mockFormValues.appId,
          customerId: ['testClientId'],
          dateFrom: dayjs(mockFormValues.dateFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD),
          dateTo: dayjs(mockFormValues.dateTo).format(DATE_TIME_FORMAT.YYYY_MM_DD),
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
          value: 'MOCK_APP_ID',
        },
        {
          value: 'MOCK_OTHER_APP_ID',
        },
      ])
    })
  })
  describe('renderClientSelectOptions', () => {
    it('should run correctly', () => {
      const { installationAppDataArray } = mockProps
      const clientOptions = renderClientSelectOptions(installationAppDataArray)
      expect(clientOptions).toEqual([
        {
          label: 'All',
          value: '',
        },
        { value: SANDBOX_CLIENT_ID, label: SANDBOX_CLIENT_NAME },
        { value: 'DXX', label: 'DXX' },
      ])
    })
  })
})

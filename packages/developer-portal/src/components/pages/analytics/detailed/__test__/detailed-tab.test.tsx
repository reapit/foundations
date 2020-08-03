import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import {
  DetailedTab,
  handleMapAppNameToInstallation,
  handleFetchAppUsageStatsDataUseCallback,
  handleFetchAppUsageStatsDataUseEffect,
  handleFetchHttpTrafficPerDayDataUseCallback,
  handleFetchHttpTrafficPerDayDataUseEffect,
  handleDefaultFilter,
} from '../detailed-tab'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { fetchInstallationsList, fetchInstallationsFilterList } from '@/actions/installations'
import { httpTrafficPerDayRequestData } from '@/actions/app-http-traffic-event'
import { developerState } from '@/sagas/__stubs__/developer'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

jest.mock('@reapit/elements', () => ({
  ...jest.requireActual('@reapit/elements'),
  toLocalTime: jest.fn().mockReturnValue('localtime'),
}))
jest.mock('../../../../../core/store')

const mockState = {
  appUsageStats: {
    appUsageStatsData: usageStatsDataStub,
    loading: false,
  },
  installations: {
    installationsList: installationsStub,
    formState: { state: 'PENDING' },
  },
  developer: developerState,
  appHttpTraffic: {
    perDayLoading: false,
    trafficEvents: httpTrafficPerDayStub,
  },
} as ReduxState

describe('OverviewPage', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)

    jest.resetAllMocks()
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  beforeAll(() => {
    const mockDateString = '2020-07-06'
    MockDate.set(new Date(mockDateString))
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should match snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <DetailedTab />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleFetchAppUsageStatsDataUseCallback', () => {
    it('should run correctly', () => {
      const fn = handleFetchAppUsageStatsDataUseCallback(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchInstallationsFilterList({
          // default is last 7 days
          installedDateFrom: '2020-06-30',
          installedDateTo: '2020-07-06',
          pageSize: 9999,
        }),
      )
      expect(spyDispatch).toBeCalledWith(
        fetchInstallationsList({
          pageSize: 9999,
        }),
      )
    })
  })

  describe('handleFetchHttpTrafficPerDayDataUseCallback', () => {
    it('should run correctly', () => {
      const developerAppData = appsDataStub.data.data || []
      const fn = handleFetchHttpTrafficPerDayDataUseCallback(developerAppData, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        httpTrafficPerDayRequestData({
          applicationId: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
          // default is last 7 days
          dateFrom: '2020-06-30',
          dateTo: '2020-07-06',
        }),
      )
    })
    it('should run correctly', () => {
      const developerAppData = []
      const mockDispatch = jest.fn()
      const fn = handleFetchHttpTrafficPerDayDataUseCallback(developerAppData, mockDispatch)
      fn()
      expect(mockDispatch).toHaveBeenCalledTimes(0)
    })
  })
})

describe('handleDefaultFilter', () => {
  it('should run correctly', () => {
    const developerAppData = appsDataStub.data.data || []
    const result = handleDefaultFilter(developerAppData)
    expect(result).toEqual({
      appIds: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
    })
  })
})

describe('handleFetchAppUsageStatsDataUseEffect', () => {
  it('should run correctly', () => {
    const mockFunction = jest.fn()
    const fn = handleFetchAppUsageStatsDataUseEffect(mockFunction)
    fn()
    expect(mockFunction).toBeCalled()
  })
})

describe('handleFetchHttpTrafficPerDayDataUseEffect', () => {
  it('should run correctly', () => {
    const mockFunction = jest.fn()
    const fn = handleFetchHttpTrafficPerDayDataUseEffect(mockFunction)
    fn()
    expect(mockFunction).toBeCalled()
  })
})

describe('handleMapAppNameToInstallation', () => {
  const installationsArray = [
    {
      id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
      appId: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
      created: '2019-12-03T05:33:20',
      client: 'DXX',
      status: 'Active',
      links: [
        {
          rel: 'self',
          href: 'http://dev.platformmarketplace.reapit.net/installations/b3c2f644-3241-4298-b320-b0398ff492f9',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'http://dev.platformmarketplace.reapit.net/apps/062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
          action: 'GET',
        },
      ],
    },
  ]
  const developerDataArray = [
    {
      id: '062a376c-f5a3-46a0-a64b-e4bc6e5af2c1',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
      name: 'test',
      summary:
        'nXXT2zaK807ysWgy8F0WEhIYRP3TgosAtfuiLtQCImoSx0kynxbIF0nkGHU36Oz13kM3DG0Bcsic' +
        'r8L6eWFKLBg4axlmiOEWcvwHAbBP9LRvoFkCl58k1wjhOExnpaZItEyOT1AXVKv8PE44aMGtVz',
      developer: "Pete's Proptech World Ltd",
      homePage: 'http://google.com/abc',
      iconUri: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/d10e790c-2bf2-40ae-9c43-82c1534bde31.png',
      links: [
        {
          rel: 'self',
          href: 'http://platformdemo.reapit.net/marketplace/apps/09043eb8-9e5e-4650-b7f1-f0cb62699027',
          action: 'GET',
        },
        {
          rel: 'developer',
          href: 'http://platformdemo.reapit.net/marketplace/developers/28c9ea52-7f73-4814-9e00-4e3714b8adeb',
          action: 'GET',
        },
      ],
    },
  ]
  it('should return correctly', () => {
    const fn = handleMapAppNameToInstallation(installationsArray, developerDataArray)
    const result = fn()
    expect(result).toEqual([{ ...installationsArray[0], appName: 'test' }])
  })

  it('should return correctly when not found app in developerDataArray', () => {
    const fn = handleMapAppNameToInstallation(installationsArray, [{ ...developerDataArray[0], id: 'fake id' }])
    const result = fn()
    expect(result).toEqual(installationsArray)
  })
})

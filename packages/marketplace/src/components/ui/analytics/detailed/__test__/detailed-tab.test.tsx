import * as React from 'react'
import { Provider } from 'react-redux'
import * as ReactReduxHooks from './react-redux-hooks'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import dayjs from 'dayjs'
import {
  DetailedTab,
  handleMapAppNameToInstallation,
  handleFetchAppUsageStatsDataUseCallback,
  handleFetchAppUsageStatsDataUseEffect,
  mapState,
  handleLoadAppUsageStatsUseCallback,
  handleLoadInstallationsUseCallback,
  MapState,
} from '../detailed-tab'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { DATE_TIME_FORMAT } from '@reapit/elements'
import { AppUsageStatsParams, appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { InstallationParams, appInstallationsRequestData } from '@/actions/app-installations'
import { developerState } from '@/sagas/__stubs__/developer'

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(fn => fn(mockState)),
//   useDispatch: () => jest.fn(),
// }))
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
    installationsAppData: installationsStub,
    formState: 'PENDING',
    loading: false,
  },
  developer: developerState,
} as ReduxState

describe('OverviewPage', () => {
  let store
  let spySelector
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    /* mocking useSelector on our mock store */
    spySelector = jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation(() => mapState(mockState))
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match snapshot', () => {
    expect(
      shallow(
        <Provider store={store}>
          <DetailedTab />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('mapState', () => {
    it('should run correctly', () => {
      const mockedUseSelector = spySelector as jest.Mock<MapState>
      const { appUsageStats, developer, installations } = mockedUseSelector(state => mapState(state))
      expect(appUsageStats).toEqual(mockState.appUsageStats)
      expect(developer).toEqual(mockState.developer)
      expect(installations).toEqual(mockState.installations)
    })
  })

  describe('handleLoadAppUsageStatsUseCallback', () => {
    it('should run correctly', () => {
      const mockAppUsageStatsParams: AppUsageStatsParams = {
        appId: ['1'],
        dateFrom: dayjs()
          .subtract(1, 'day')
          .format(DATE_TIME_FORMAT.YYYY_MM_DD),
        dateTo: dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD),
      }
      const fn = handleLoadAppUsageStatsUseCallback(spyDispatch)
      fn(mockAppUsageStatsParams)
      expect(spyDispatch).toBeCalledWith(appUsageStatsRequestData(mockAppUsageStatsParams))
    })
  })

  describe('handleLoadInstallationsUseCallback', () => {
    it('should run correctly', () => {
      const mockInstallationsParams: InstallationParams = {
        appId: ['1'],
        installedDateFrom: dayjs()
          .subtract(1, 'day')
          .format(DATE_TIME_FORMAT.YYYY_MM_DD),
        installedDateTo: dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD),
      }
      const fn = handleLoadInstallationsUseCallback(spyDispatch)
      fn(mockInstallationsParams)
      expect(spyDispatch).toBeCalledWith(appInstallationsRequestData(mockInstallationsParams))
    })
  })
})

describe('handleFetchAppUsageStatsDataUseCallback', () => {
  it('should run correctly', () => {
    const loadStats = jest.fn()
    const loadInstallations = jest.fn()
    const developerAppData = appsDataStub.data.data || []
    const fn = handleFetchAppUsageStatsDataUseCallback(developerAppData, loadStats, loadInstallations)
    fn()
    expect(loadStats).toBeCalled()
    expect(loadInstallations).toBeCalled()
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

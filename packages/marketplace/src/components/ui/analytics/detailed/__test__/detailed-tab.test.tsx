import * as React from 'react'
import dayjs from 'dayjs'
import { shallow } from 'enzyme'
import {
  DetailedTab,
  handleMapAppNameToInstallation,
  handleFetchAppUsageStatsDataUseCallback,
  handleFetchAppUsageStatsDataUseEffect,
  mapStateToProps,
  mapDispatchToProps,
} from '../detailed-tab'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { DeveloperState } from '@/reducers/developer'
import { AppInstallationsState } from '@/reducers/app-installations'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'

jest.mock('@reapit/elements', () => ({
  ...jest.requireActual('@reapit/elements'),
  toLocalTime: jest.fn().mockReturnValue('localtime'),
}))
jest.mock('../../../../../core/store')

const developer = {
  developerData: appsDataStub,
  loading: false,
} as DeveloperState

const installations = {
  loading: false,
  installationsAppData: {
    ...installationsStub,
  },
} as AppInstallationsState

const appUsageStats: AppUsageStatsState = {
  loading: false,
  appUsageStatsData: {},
}

const loadStats = jest.fn()

describe('OverviewPage', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <DetailedTab
          installations={installations}
          developer={developer}
          appUsageStats={appUsageStats}
          loadStats={loadStats}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match when loading', () => {
    const installationsLoading = { ...installations, loading: true }
    const developerLoading = { ...developer, loading: true }
    expect(
      shallow(
        <DetailedTab
          installations={installationsLoading}
          developer={developerLoading}
          appUsageStats={appUsageStats}
          loadStats={loadStats}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('mapStateToProps', () => {
  it('should return correct value', () => {
    expect(mapStateToProps({ installations, developer, appUsageStats } as ReduxState)).toEqual({
      installations,
      developer,
      appUsageStats,
    })
  })
})

describe('mapDispatchToProps', () => {
  it('should render correctly', () => {
    const mockDispatch = jest.fn()
    const { loadStats } = mapDispatchToProps(mockDispatch)
    if (loadStats) {
      loadStats({
        dateFrom: dayjs().toISOString(),
      })
      expect(mockDispatch).toBeCalled()
    }
  })
})

describe('handleFetchAppUsageStatsDataUseCallback', () => {
  it('should run correctly', () => {
    const developerAppData = appsDataStub.data.data || []
    const fn = handleFetchAppUsageStatsDataUseCallback(developerAppData, loadStats)
    fn()
    expect(loadStats).toBeCalled()
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

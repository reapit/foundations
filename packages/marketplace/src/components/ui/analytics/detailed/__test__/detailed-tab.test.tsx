import * as React from 'react'
import dayjs from 'dayjs'
import { shallow } from 'enzyme'
import {
  DetailedTab,
  InstallationTable,
  handleSetPageNumber,
  installationTableColumn,
  handleMapAppNameToInstallation,
  handleUseMemoData,
  handleCountCurrentInstallationForEachApp,
  sortAppByDateInstalled,
  countAppHasInstallation,
  countAppNoInstallation,
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

describe('InstallationTable', () => {
  const installedApps = handleMapAppNameToInstallation(
    installations.installationsAppData?.data || [],
    appsDataStub.data.data || [],
  )()

  it('should match snapshot', () => {
    expect(
      shallow(<InstallationTable installedApps={installedApps} installations={installations} developer={developer} />),
    ).toMatchSnapshot()
  })

  it('should match with null installationsAppData', () => {
    const installationsWithoutData = { ...installations, installationsAppData: null }
    expect(
      shallow(
        <InstallationTable
          installedApps={installedApps}
          installations={installationsWithoutData}
          developer={developer}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match with null developerData', () => {
    const developerWithoutData = { ...developer, developerData: null }
    expect(
      shallow(
        <InstallationTable
          installedApps={installedApps}
          installations={installations}
          developer={developerWithoutData}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetPageNumber', () => {
  it('should call setPageNumber', () => {
    const setPageNumber = jest.fn()
    const fn = handleSetPageNumber(setPageNumber)
    fn(1)
    expect(setPageNumber).toHaveBeenCalledWith(1)
  })
})

describe('installationTableColumn', () => {
  it('should call accessor', () => {
    installationTableColumn.forEach(({ Header, accessor }) => {
      if (typeof accessor === 'function') {
        if (Header === 'Date of installation') {
          const result = accessor({ created: 'date' })
          expect(result).toEqual('localtime')
        }
        if (Header === 'Date of Uninstallation') {
          expect(accessor({ created: 'date', terminatesOn: 'terminated date' })).toEqual('localtime')
          expect(accessor({})).toEqual('')
        }
      }
    })
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

describe('handleUseMemoData', () => {
  const installationAppDataArrayWithName = [
    {
      appName: 'app2',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
      appId: 'id1',
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
  it('should return correctly', () => {
    const fn = handleUseMemoData(installationAppDataArrayWithName, 1)
    const result = fn()
    expect(result).toEqual([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]])
  })
  it('should return correctly when reorder', () => {
    const fn = handleUseMemoData([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]], 1)
    const result = fn()
    expect(result).toEqual([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]])
  })
  it('should return correctly when created undefined', () => {
    const fn = handleUseMemoData(
      [installationAppDataArrayWithName[0], { ...installationAppDataArrayWithName[1], created: undefined }],
      1,
    )
    const result = fn()
    expect(result).toEqual([
      installationAppDataArrayWithName[0],
      { ...installationAppDataArrayWithName[1], created: undefined },
    ])
  })
})

describe('handleCountCurrentInstallationForEachApp', () => {
  const installationAppDataArrayWithName = [
    {
      terminatesOn: '2019-12-05T05:33:20',
      appName: 'app2',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
      appId: 'id1',
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
      id: 'id1',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
      name: 'app2',
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
    {
      id: 'id1',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
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
    const fn = handleCountCurrentInstallationForEachApp(installationAppDataArrayWithName, developerDataArray)
    const result = fn()
    expect(result).toEqual({ app1: 2, app2: 0 })
  })
})

describe('sortAppByDateInstalled', () => {
  const installationAppDataArrayWithName = [
    {
      appName: 'app2',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
      appId: 'id1',
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

  it('should return correctly', () => {
    const result = sortAppByDateInstalled(installationAppDataArrayWithName)
    expect(result).toEqual([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]])
  })

  it('should return correctly when reorder', () => {
    const result = sortAppByDateInstalled([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]])
    expect(result).toEqual([installationAppDataArrayWithName[1], installationAppDataArrayWithName[0]])
  })

  it('should return correctly when created undefined', () => {
    const result = sortAppByDateInstalled([
      installationAppDataArrayWithName[0],
      { ...installationAppDataArrayWithName[1], created: undefined },
    ])
    expect(result).toEqual([
      installationAppDataArrayWithName[0],
      { ...installationAppDataArrayWithName[1], created: undefined },
    ])
  })
})

describe('countAppHasInstallation', () => {
  const installationAppDataArrayWithName = [
    {
      terminatesOn: '2019-12-05T05:33:20',
      appName: 'app2',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'id2',
      appId: 'id2',
      created: '2019-12-02T05:33:20',
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
    {
      appName: 'app1',
      id: 'b3c2f644-3241-4298-b320-b0398ff492f9',
      appId: 'id1',
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
  it('should return correctly', () => {
    const result = countAppHasInstallation(installationAppDataArrayWithName)
    expect(result).toEqual({ app1: 2 })
  })
})

describe('countAppNoInstallation', () => {
  const developerDataArray = [
    {
      id: 'id1',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
      name: 'app2',
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
    {
      id: 'id1',
      developerId: '28c9ea52-7f73-4814-9e00-4e3714b8adeb',
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
    const result = countAppNoInstallation(developerDataArray)
    expect(result).toEqual({ app2: 0 })
  })
})

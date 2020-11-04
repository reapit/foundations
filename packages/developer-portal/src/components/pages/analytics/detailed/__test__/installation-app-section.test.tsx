import * as React from 'react'
import { mount } from 'enzyme'
import {
  InstallationAppSection,
  handleSetPageNumber,
  installationTableColumn,
  handleUseMemoData,
  handleCountCurrentInstallationForEachApp,
  sortAppByDateInstalled,
  countAppsHasInstallation,
} from '../installation-app-section'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { InstallationsRootState } from '@/reducers/installations'
import { handleMapAppNameToInstallation } from '../detailed-tab'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'

jest.mock('@reapit/elements', () => ({
  ...(jest.requireActual('@reapit/elements') as Object),
  toLocalTime: jest.fn().mockReturnValue('localtime'),
}))
jest.mock('../../../../../core/store')

const installations = {
  installationsList: {
    isLoading: false,
    list: installationsStub,
  },
} as InstallationsRootState

describe('InstallationTable', () => {
  const installedApps = handleMapAppNameToInstallation(
    installations.installationsList?.list?.data || [],
    appsDataStub.data.data || [],
  )()
  let store

  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <InstallationAppSection installedApps={installedApps} filteredInstalledApps={installedApps} apps={[]} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match with null installationsAppData', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <InstallationAppSection installedApps={installedApps} filteredInstalledApps={installedApps} apps={[]} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match with null developerData', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <InstallationAppSection installedApps={installedApps} filteredInstalledApps={installedApps} />
        </ReactRedux.Provider>,
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
        if (Header === 'Customer Address') {
          expect(
            accessor({
              customerAddress: {
                buildingName: 'Third Floor',
                buildingNumber: '67-74',
                line1: 'Saffron Hill',
                line2: 'London',
                line3: '',
                line4: '',
                postcode: 'EC1N 8QX',
                countryId: 'GB',
              },
            }),
          ).toEqual('Third Floor 67-74 Saffron Hill London   EC1N 8QX GB')
        }
      }
    })
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
    expect(result).toEqual([
      { appName: 'app2', installation: 0 },
      { appName: 'app1', installation: 2 },
    ])
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

describe('countAppsHasInstallation', () => {
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
    const result = countAppsHasInstallation(installationAppDataArrayWithName)
    expect(result).toEqual([{ appName: 'app1', installation: 2 }])
  })
})

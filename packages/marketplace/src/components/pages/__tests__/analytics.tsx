import * as React from 'react'
import { mount, shallow } from 'enzyme'
import {
  AnalyticsPage,
  transformListAppToSelectBoxOptions,
  transformAppInstalationsToTableColumsCompatible,
  handleSubmit
} from '../analytics'
import { installationsStub } from '@/sagas/__stubs__/installations'
import { mockLoginSession, mockRefreshParams } from '@/core/__mocks__/store'
import { AnalyticsPageProps, mapStateToProps, mapDispatchToProps } from '@/components/pages/analytics'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { defaultAppAuthState } from '@/reducers/app-detail'
import { RouteComponentProps, StaticContext } from 'react-router'
import Routes from '@/constants/routes'

jest.mock('../../../core/store')

const routerProps = appId =>
  ({
    match: {
      params: {
        page: '2'
      }
    },
    location: {
      search: `page=1${appId ? `&appId=${appId}` : ''}`
    }
  } as RouteComponentProps<any, StaticContext, any>)

const mockProps = (
  appId,
  appInstallations,
  appInstallationsLoading,
  appsOfDeveloper,
  appsOfDeveloperLoading,
  appDetail,
  appDetailLoading
) =>
  ({
    appInstallations: {
      installationsAppData: appInstallations,
      formState: 'SUCCESS',
      loading: appInstallationsLoading
    },
    appsOfDeveloper: {
      developerData: {
        data: appsOfDeveloper,
        scopes: []
      },
      formState: 'SUCCESS',
      isVisible: true,
      loading: appsOfDeveloperLoading
    },
    appDetail: {
      appDetailData: appDetail,
      authentication: defaultAppAuthState,
      error: false,
      isStale: false,
      loading: appDetailLoading
    },
    requestAppDetailData: jest.fn(),
    ...routerProps(appId)
  } as AnalyticsPageProps)

describe('Analytics', () => {
  it('should match a snapshot when appInstallations loading false', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            false,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when appInstallations loading true', () => {
    expect(
      mount(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            true,
            appsDataStub.data,
            false,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when appInstallations data null', () => {
    expect(
      mount(
        <AnalyticsPage
          {...mockProps(appDetailDataStub.data.id, null, false, appsDataStub.data, false, appDetailDataStub, false)}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when appsOfDeveloper loading true', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            true,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when appsOfDeveloper loading false', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            false,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when appsOfDeveloper data undefined', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            false,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when app detail loading true', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            false,
            appDetailDataStub,
            true
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when app detail loading false', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(
            appDetailDataStub.data.id,
            installationsStub,
            false,
            appsDataStub.data,
            false,
            appDetailDataStub,
            false
          )}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when app detail data undefined', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(appDetailDataStub.data.id, installationsStub, false, appsDataStub.data, false, undefined, true)}
        />
      )
    ).toMatchSnapshot()
  })

  it('should match a snapshot when no appId params', () => {
    expect(
      shallow(
        <AnalyticsPage
          {...mockProps(undefined, installationsStub, false, appsDataStub.data, false, appDetailDataStub, false)}
        />
      )
    ).toMatchSnapshot()
  })
})

describe('mapStateToProps', () => {
  it('should return correctly', () => {
    const mockState = {
      installations: {
        installationsAppData: {
          ...installationsStub,
          data: []
        },
        formState: 'SUCCESS',
        loading: true
      },
      developer: {
        developerData: {
          data: appsDataStub.data,
          scopes: []
        },
        formState: 'SUCCESS',
        isVisible: true,
        loading: false
      },
      auth: {
        error: false,
        loginType: 'DEVELOPER',
        refreshSession: mockRefreshParams,
        loginSession: mockLoginSession
      },
      appDetail: {
        appDetailData: appDetailDataStub,
        authentication: defaultAppAuthState,
        error: false,
        isStale: false,
        loading: false
      }
    } as Partial<ReduxState>

    const output = {
      appInstallations: {
        installationsAppData: {
          ...installationsStub,
          data: []
        },
        formState: 'SUCCESS',
        loading: true
      },
      appsOfDeveloper: {
        developerData: {
          data: appsDataStub.data,
          scopes: []
        },
        formState: 'SUCCESS',
        isVisible: true,
        loading: false
      },
      appDetail: {
        appDetailData: appDetailDataStub,
        authentication: defaultAppAuthState,
        error: false,
        isStale: false,
        loading: false
      }
    }
    const result = mapStateToProps(mockState as ReduxState)
    expect(result).toEqual(output)
  })
})

describe('mapDispatchToProps', () => {
  it('should run dispatch', () => {
    const mockDispatch = jest.fn()

    const result = mapDispatchToProps(mockDispatch)
    result.requestAppDetailData({ id: 'id' })

    expect(mockDispatch).toBeCalled()
  })
})

describe('transformListAppToSelectBoxOptions', () => {
  it('should transform normally', () => {
    const list = appsDataStub.data.data!
    const selectBoxOptions = list?.map(transformListAppToSelectBoxOptions)
    list?.forEach((original, index) => {
      const transformed = selectBoxOptions[index]
      expect(transformed.label).toBe(original.name)
      expect(transformed.value).toBe(original.id)
    })
  })

  it('should transform the label into "Error"', () => {
    const list = appsDataStub.data.data!.map(app => ({ ...app, name: undefined, id: undefined }))
    const selectBoxOptions = list?.map(transformListAppToSelectBoxOptions)
    list?.forEach((original, index) => {
      const transformed = selectBoxOptions[index]
      expect(transformed.label).toBe('Error')
      expect(transformed.value).toBe('Error')
    })
  })
})

describe('transformAppInstalationsToTableColumsCompatible', () => {
  const appName = 'App Name Test'
  const list = installationsStub.data!
  const transformed = list.map(transformAppInstalationsToTableColumsCompatible(appName))
  transformed.forEach(installations => {
    expect(installations.appName).toBe(appName)
  })
})

describe('handleSubmit', () => {
  it('should run correctly', () => {
    const mockHistory = {
      push: jest.fn(str => str)
    }

    handleSubmit(mockHistory, 'appId', 1)
    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.DEVELOPER_ANALYTICS}/1?appId=appId`)
  })

  it('should run correctly', () => {
    const mockHistory = {
      push: jest.fn(str => str)
    }

    handleSubmit(mockHistory, '', 1)
    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.DEVELOPER_ANALYTICS}/1`)
  })

  it('should run correctly', () => {
    const mockHistory = {
      push: jest.fn(str => str)
    }

    handleSubmit(mockHistory, '')
    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.DEVELOPER_ANALYTICS}/1`)
  })
})

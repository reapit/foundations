import * as React from 'react'
import { shallow } from 'enzyme'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { InstalledAppsItem } from '@/reducers/installed-apps'
import routes from '@/constants/routes'
import {
  InstalledApps,
  InstalledAppsProps,
  handleOnChange,
  mapStateToProps,
  handleOnCardClick,
  isFromLoginPage,
} from '../installed-apps'
import { ReduxState } from '@/types/core'
import { handleLaunchApp } from '../../../utils/launch-app'
import { setCookieString, COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN, getCookieString } from '@/utils/cookie'

jest.mock('../../../utils/launch-app')
jest.mock('@/utils/cookie', () => ({
  getCookieString: jest.fn(),
  setCookieString: jest.fn(),
}))

const mockProps = (loading: boolean, installedAppsData: InstalledAppsItem | null): InstalledAppsProps => ({
  installedAppsState: {
    loading,
    installedAppsData,
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2',
    },
  },
})

describe('InstalledApps', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<InstalledApps {...mockProps(false, appsDataStub)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(shallow(<InstalledApps {...mockProps(true, null)} />)).toMatchSnapshot()
  })

  it('handleOnChange', () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const fn = handleOnChange(mockHistory)
    fn(1)
    expect(mockHistory.push).toBeCalledWith(`${routes.INSTALLED_APPS}/${1}`)
  })

  it('mapStateToProps', () => {
    const mockState = {
      installedApps: {},
    } as ReduxState
    const result = mapStateToProps(mockState)
    const output = {
      installedAppsState: {},
    }
    expect(result).toEqual(output)
  })

  it('handleOnCardClick should call handleLaunchApp', () => {
    handleOnCardClick(appDetailDataStub.data)
    expect(handleLaunchApp).toHaveBeenCalledTimes(1)
    expect(handleLaunchApp).toHaveBeenCalledWith(appDetailDataStub.data)
  })
})

describe('should call setCookieString', () => {
  it('should be call', () => {
    isFromLoginPage()
    expect(getCookieString).toHaveBeenCalledWith(COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN)
    expect(setCookieString).toHaveBeenCalledWith(COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN, '')
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'

import { appsDataStub } from '@/sagas/__stubs__/apps'
import { MyAppsItem } from '@/reducers/my-apps'
import routes from '@/constants/routes'
import { MyApps, MyAppsProps, handleOnChange, handleUseEffect, mapStateToProps, mapDispatchToProps } from '../my-apps'
import { ReduxState } from '@/types/core'

const mockProps = (loading: boolean, appData: MyAppsItem | null, isAdmin: boolean): MyAppsProps => ({
  myAppsState: {
    loading: loading,
    myAppsData: appData,
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2',
    },
  },
  isAdmin,
})

describe('MyApps', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<MyApps {...mockProps(false, appsDataStub, true)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(shallow(<MyApps {...mockProps(true, null, true)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when isAdmin false', () => {
    expect(shallow(<MyApps {...mockProps(false, null, false)} />)).toMatchSnapshot()
  })

  it('handleOnChange', () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const fn = handleOnChange(mockHistory)
    fn(1)
    expect(mockHistory.push).toBeCalledWith(`${routes.MY_APPS}/${1}`)
  })

  it('handleUseEffect', () => {
    const mockProps = {
      isDone: true,
      installationsSetFormState: jest.fn(),
      fetchMyApp: jest.fn(),
      pageNumber: 1,
    }
    const fn = handleUseEffect(mockProps)
    fn()
    expect(mockProps.installationsSetFormState).toBeCalled()
    expect(mockProps.fetchMyApp).toBeCalledWith(mockProps.pageNumber)
  })

  it('mapStateToProps', () => {
    const mockState = {
      myApps: {},
      appDetail: {},
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            isAdmin: true,
          },
        },
      },
      installations: {
        formState: 'PENDING',
      },
    } as ReduxState
    const result = mapStateToProps(mockState)
    const output = {
      myAppsState: {},
      appDetail: {},
      clientId: '',
      installationsFormState: 'PENDING',
      isAdmin: true,
    }
    expect(result).toEqual(output)
  })

  describe('mapDispatchToProps', () => {
    it('fetchAppDetail', () => {
      const mockDispatch = jest.fn()
      const { fetchAppDetail } = mapDispatchToProps(mockDispatch)
      fetchAppDetail('123', '')
      expect(mockDispatch).toBeCalled()
    })

    it('fetchMyApp', () => {
      const mockDispatch = jest.fn()
      const { fetchMyApp } = mapDispatchToProps(mockDispatch)
      fetchMyApp(1)
      expect(mockDispatch).toBeCalled()
    })

    it('installationsSetFormState', () => {
      const mockDispatch = jest.fn()
      const { installationsSetFormState } = mapDispatchToProps(mockDispatch)
      installationsSetFormState('PENDING')
      expect(mockDispatch).toBeCalled()
    })
  })
})

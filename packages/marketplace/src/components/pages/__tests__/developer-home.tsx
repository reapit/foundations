import * as React from 'react'
import { shallow } from 'enzyme'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import routes from '@/constants/routes'
import {
  DeveloperHome,
  DeveloperProps,
  handleOnCardClick,
  handleAfterClose,
  handleOnChange,
  mapStateToProps,
  mapDispatchToProps,
} from '../developer-home'
import { ReduxState } from '@/types/core'

describe('DeveloperHome', () => {
  it('should match a snapshot', () => {
    const mockProps: DeveloperProps = {
      developerState: {
        myIdentity: {},
        error: null,
        billing: {
          from: '',
          to: '',
          requestsByPeriod: [],
        },
        isServiceChartLoading: false,
        isMonthlyBillingLoading: false,
        monthlyBilling: null,
        loading: false,
        isVisible: false,
        developerData: {
          ...appsDataStub,
          scopes: appPermissionStub,
        },
        formState: 'PENDING',
      },
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2',
        },
      },
    }
    expect(shallow(<DeveloperHome {...mockProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const mockProps: DeveloperProps = {
      // @ts-ignore: just pick the needed props for the test
      developerState: {},
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2',
        },
      },
    }
    expect(shallow(<DeveloperHome {...mockProps} />)).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const mockProps: DeveloperProps = {
      developerState: {
        isServiceChartLoading: false,
        isMonthlyBillingLoading: false,
        monthlyBilling: null,
        myIdentity: {},
        error: null,
        billing: {
          from: '',
          to: '',
          requestsByPeriod: [],
        },
        loading: false,
        isVisible: true,
        developerData: {
          ...appsDataStub,
          scopes: appPermissionStub,
        },
        formState: 'PENDING',
      },
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2',
        },
      },
    }
    expect(shallow(<DeveloperHome {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleOnCardClick', () => {
    it('should run correctly', () => {
      const mockProps = {
        setVisible: jest.fn(),
        appDetail: {
          appDetailData: appsDataStub.data,
        },
        fetchAppDetail: jest.fn(),
        setDeveloperAppModalStateViewDetail: jest.fn(),
        appDeleteSetInitFormState: jest.fn(),
      }
      const fn = handleOnCardClick(mockProps)
      fn({ id: '1' })
      expect(mockProps.setVisible).toBeCalled()
      expect(mockProps.setDeveloperAppModalStateViewDetail).toBeCalled()
      expect(mockProps.appDeleteSetInitFormState).toBeCalled()
      expect(mockProps.fetchAppDetail).toBeCalled()
    })
  })

  describe('handleAfterClose', () => {
    const setVisible = jest.fn()
    const removeAuthenticationCode = jest.fn()
    const fn = handleAfterClose({ setVisible, removeAuthenticationCode })
    fn()
    expect(removeAuthenticationCode).toBeCalled()
    expect(setVisible).toBeCalledWith(false)
  })

  describe('handleOnChange', () => {
    it('should call push correctly', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleOnChange(mockHistory)
      fn(1)
      expect(mockHistory.push).toBeCalledWith(`${routes.DEVELOPER_MY_APPS}/${1}`)
    })
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const mockState = {
        developer: {
          isVisible: true,
        },
        appDetail: appsDataStub && appsDataStub.data && appsDataStub.data.data && appsDataStub.data.data[0],
      } as ReduxState
      const result = mapStateToProps(mockState)
      const output = {
        developerState: {
          isVisible: true,
        },
        appDetail: mockState.appDetail,
        isVisible: true,
      }
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('fetchAppDetail', () => {
      const mockDispatch = jest.fn()
      const { fetchAppDetail } = mapDispatchToProps(mockDispatch)
      fetchAppDetail('123')
      expect(mockDispatch).toBeCalled()
    })

    it('setDeveloperAppModalStateViewDetail', () => {
      const mockDispatch = jest.fn()
      const { setDeveloperAppModalStateViewDetail } = mapDispatchToProps(mockDispatch)
      setDeveloperAppModalStateViewDetail()
      expect(mockDispatch).toBeCalled()
    })

    it('appDeleteSetInitFormState', () => {
      const mockDispatch = jest.fn()
      const { appDeleteSetInitFormState } = mapDispatchToProps(mockDispatch)
      appDeleteSetInitFormState()
      expect(mockDispatch).toBeCalled()
    })

    it('setVisible', () => {
      const mockDispatch = jest.fn()
      const { setVisible } = mapDispatchToProps(mockDispatch)
      setVisible(true)
      expect(mockDispatch).toBeCalled()
    })
  })
})

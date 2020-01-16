import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import {
  AdminApps,
  AdminAppsProps,
  mapStateToProps,
  mapDispatchToProps,
  renderForm,
  handleCloseAppDeleteModal
} from '../admin-apps'
import { RouteComponentProps, StaticContext } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

const routerProps = {
  match: {
    params: {
      page: '2'
    }
  },
  location: {
    search: 'page=1'
  }
} as RouteComponentProps<any, StaticContext, any>

const props = (loading: boolean): AdminAppsProps => ({
  adminAppsState: {
    loading: loading,
    formState: 'PENDING',
    adminAppsData: appsDataStub.data
  },
  onChangeFeatured: jest.fn(),
  ...routerProps
})

describe('AdminApps', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<AdminApps {...props(false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AdminApps {...props(true)} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const mockState = {
        adminApps: appsDataStub.data
      } as ReduxState
      const output = {
        adminAppsState: mockState.adminApps,
        ...routerProps
      }
      const result = mapStateToProps(mockState, routerProps)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
      const mockOwnProps = getMockRouterProps({})
      const { onChangeFeatured } = mapDispatchToProps(mockDispatch)
      onChangeFeatured({ id: '1', isFeatured: true })
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('renderForm', () => {
    it('should return correctly', () => {
      const setFilter = jest.fn()
      const fn = renderForm(setFilter)({ values: {}, resetForm: jest.fn() })
      expect(fn).toMatchSnapshot()
    })
  })

  describe('handleCloseAppDeleteModal', () => {
    it('should return correctly', () => {
      const mockProps = {
        setDeleteModal: jest.fn()
      }
      handleCloseAppDeleteModal(mockProps)()
      expect(mockProps.setDeleteModal).toBeCalled()
    })
  })
})

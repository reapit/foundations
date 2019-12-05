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
  handleDeleteSuccess
} from '../admin-apps'
import { RouteComponentProps, StaticContext } from 'react-router'

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
    loading: false,
    formState: 'PENDING',
    adminAppsData: appsDataStub.data
  },
  fetchApps: jest.fn(),
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
        adminAppsState: mockState.adminApps
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
      const { fetchApps } = mapDispatchToProps(mockDispatch)
      fetchApps({ pageNumber: 1, appName: '1', companyName: 'a' })()
      expect(mockDispatch).toBeCalled()
    })

    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()
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

  describe('handleDeleteSuccess', () => {
    it('should return correctly', () => {
      const mockProps = {
        setDeleteModal: jest.fn(),
        fetchApps: jest.fn(),
        filter: {
          appName: '1'
        },
        pageNumber: 1
      }
      handleDeleteSuccess(mockProps)()
      expect(mockProps.setDeleteModal).toBeCalled()
      expect(mockProps.fetchApps).toBeCalled()
    })
  })
})

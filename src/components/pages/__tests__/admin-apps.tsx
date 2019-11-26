import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { ReduxState } from '@/types/core'
import { AdminApps, AdminAppsProps, mapStateToProps, mapDispatchToProps, renderForm } from '../admin-apps'

describe('AdminApps', () => {
  it('should match a snapshot when LOADING false', () => {
    const props: AdminAppsProps = {
      adminAppsState: {
        loading: false,
        formState: 'PENDING',
        adminAppsData: appsDataStub.data
      },
      fetchApps: jest.fn(),
      onChangeFeatured: jest.fn()
    }
    expect(toJson(shallow(<AdminApps {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    const props: AdminAppsProps = {
      adminAppsState: {
        loading: true,
        formState: 'PENDING',
        adminAppsData: appsDataStub.data
      },
      // @ts-ignore: just pick the needed props for the test
      match: {
        params: {
          page: '2'
        }
      }
    }
    expect(toJson(shallow(<AdminApps {...props} />))).toMatchSnapshot()
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
      fetchApps({ pageNumber: 1, appName: '1', developerName: 'a' })
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
})

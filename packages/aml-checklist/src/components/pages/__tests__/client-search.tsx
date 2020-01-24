import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  ClientSearch,
  ClientSearchProps,
  renderForm,
  mapStateToProps,
  mapDispatchToProps,
  searchContacts
} from '../client-search'
import { LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'

const props: ClientSearchProps = {
  setSearchParams: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {}
}

describe('ClientSearch', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ClientSearch {...props} />))).toMatchSnapshot()
  })

  it('renderForm should match a snapshot when loginMode is DESKTOP', () => {
    const mockProps = {
      loginMode: 'DESKTOP' as LoginMode
    }
    const fn = renderForm(mockProps)({ values: {} })
    expect(fn).toMatchSnapshot()
  })

  it('renderForm should match a snapshot when loginMode is WEB', () => {
    const mockProps = {
      loginMode: 'WEB' as LoginMode
    }
    const fn = renderForm(mockProps)({ values: {} })
    expect(fn).toMatchSnapshot()
  })

  it('searchContacts', () => {
    const mockProps = {
      setSearchParams: jest.fn(),
      history: {
        push: jest.fn()
      }
    }
    const mockValues = { values: {} }
    const fn = searchContacts(mockProps)
    fn(mockValues)
    expect(mockProps.setSearchParams).toBeCalledWith(mockValues)
    expect(mockProps.history.push).toBeCalledWith(Routes.RESULTS)
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: {}
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        loginMode: 'WEB'
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        loginMode: 'WEB'
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { setSearchParams } = mapDispatchToProps(mockDispatch)
      setSearchParams({ name: 'a' })
      expect(mockDispatch).toBeCalled()
    })
  })
})

import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { ClientSearch, ClientSearchProps, renderForm, mapDispatchToProps, searchContacts } from '../client-search'
import Routes from '@/constants/routes'

const props: ClientSearchProps = {
  setSearchParams: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {},
}

describe('ClientSearch', () => {
  it('should match a snapshot', () => {
    expect(render(<ClientSearch {...props} />)).toMatchSnapshot()
  })

  it('renderForm should match a snapshot when loginMode is DESKTOP', () => {
    const mockProps = {
      connectIsDesktop: true,
    }
    const fn = renderForm(mockProps)({ values: {} })
    expect(fn).toMatchSnapshot()
  })

  it('renderForm should match a snapshot when loginMode is WEB', () => {
    const mockProps = {
      connectIsDesktop: false,
    }
    const fn = renderForm(mockProps)({ values: {} })
    expect(fn).toMatchSnapshot()
  })

  it('searchContacts', () => {
    const mockProps = {
      setSearchParams: jest.fn(),
      history: {
        push: jest.fn(),
      },
    }
    const mockValues = { values: {} }
    const fn = searchContacts(mockProps)
    fn(mockValues)
    expect(mockProps.setSearchParams).toBeCalledWith(mockValues)
    expect(mockProps.history.push).toBeCalledWith(Routes.RESULTS)
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

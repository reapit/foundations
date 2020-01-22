import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ClientSearch, ClientSearchProps, mapDispatchToProps, searchContacts, renderForm } from '../client-search'
import { SearchParams } from '@/actions/results'
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

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const mockParams = {
        name: 'mockName',
        address: 'mockAddress',
        identityCheck: 'PASS'
      } as SearchParams
      const { setSearchParams } = mapDispatchToProps(mockDispatch)
      setSearchParams(mockParams)
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('searchContacts', () => {
    it('should run correctly', () => {
      const mockSetSearchParams = jest.fn()
      const mockHistory = {
        push: jest.fn()
      }
      const mockValues = {}
      const fn = searchContacts({ setSearchParams: mockSetSearchParams, history: mockHistory })
      fn(mockValues)
      expect(mockSetSearchParams).toBeCalledWith(mockValues)
      expect(mockHistory.push).toBeCalledWith(Routes.RESULTS)
    })
  })

  describe('renderForm', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderForm()({ values: {} })}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderForm()({ values: { name: 'mockName' } })}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})

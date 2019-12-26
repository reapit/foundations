import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { Home, renderAddress, renderPostalCode, renderContent, handleChangePage, RenderContentParams } from './home'
import CONTACTS from './contacts.graphql'
import { contacts } from '@/graphql/__mocks__/contacts'
import { contact } from '@/graphql/__mocks__/contact'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { error } from '@/graphql/__mocks__/error'

const mockQueries = {
  request: {
    query: CONTACTS,
    variables: { pageSize: 10, pageNumber: 1 },
  },
  result: {
    data: contacts,
  },
}

describe('Home', () => {
  describe('Home', () => {
    it('should match a snapshot', () => {
      const mockProps = getMockRouterProps({ params: {}, search: '?page=1' })
      const wrapper = mount(
        <MockedProvider mocks={[mockQueries]} addTypename={true}>
          <Home {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match a snapshot', () => {
      const mockProps = getMockRouterProps({ params: {}, search: '' })
      const wrapper = mount(
        <MockedProvider mocks={[mockQueries]} addTypename={true}>
          <Home {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderAddress', () => {
    it('should match snapshot', () => {
      const mockParams = {
        row: {
          original: contact,
        },
      }
      const wrapper = shallow(<div>{renderAddress(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderPostalCode', () => {
    it('should match snapshot', () => {
      const mockParams = {
        row: {
          original: contact,
        },
      }
      const wrapper = shallow(<div>{renderPostalCode(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const mockParams = {
        loading: true,
        error: undefined,
        contacts: {},
        handleChangePage: jest.fn(),
      } as RenderContentParams
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams = {
        loading: false,
        error: error,
        contacts: {},
        handleChangePage: jest.fn(),
      } as RenderContentParams
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams = {
        loading: false,
        error: undefined,
        contacts: contacts,
        handleChangePage: jest.fn(),
      } as RenderContentParams
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleChangePage', () => {
    it('should run correctly', () => {
      const mockParams = { history: { push: jest.fn() } }
      const fn = handleChangePage(mockParams)
      fn(2)
      expect(mockParams.history.push).toBeCalledWith({ search: 'page=2' })
    })
  })
})

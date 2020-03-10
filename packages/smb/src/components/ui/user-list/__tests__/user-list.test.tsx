import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  UserList,
  UserListProps,
  renderUserList,
  RenderUserListParams,
  getDataTable,
  tableHeaders,
  handleChangePage,
} from '../user-list'
import { GetUsers } from '../user-list.graphql'
import { users } from '../__mocks__/users'
import { error } from '@/graphql/__mocks__/error'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

const mockQueries = {
  request: {
    query: GetUsers,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: users,
  },
}

describe('UserList', () => {
  describe('UserList', () => {
    it('should match a snapshot', () => {
      const mockProps: UserListProps = getMockRouterProps({ params: {}, search: '?page=1' })
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries]} addTypename={false}>
            <UserList {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderUserList', () => {
    it('should match snapshot', () => {
      const mockParams: RenderUserListParams = {
        loading: true,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderUserList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderUserListParams = {
        loading: false,
        error,
        handleChangePage: jest.fn(),
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderUserList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderUserListParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: getDataTable(users),
      }
      const wrapper = shallow(<div>{renderUserList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    describe('getDataTable', () => {
      it('should run correctly', () => {
        const dataTable = getDataTable(users)
        expect(Array.isArray(dataTable)).toBe(true)
        expect(dataTable.length).toBe(4)
        expect(dataTable[0]).toEqual(tableHeaders)
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
})

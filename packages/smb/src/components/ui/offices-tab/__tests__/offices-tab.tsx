import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import {
  OfficesTab,
  OfficesTabProps,
  renderContent,
  RenderContentParams,
  getDataTable,
  tableHeaders,
} from '../offices-tab'
import { OFFICES } from '../offices-tab.graphql'
import { offices } from '../__mocks__/offices'
import { error } from '@/graphql/__mocks__/error'

const mockQueries = {
  request: {
    query: OFFICES,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: offices,
  },
}

describe('OfficesTab', () => {
  describe('OfficesTab', () => {
    it('should match a snapshot', () => {
      const mockProps: OfficesTabProps = {}
      const wrapper = mount(
        <MockedProvider mocks={[mockQueries]} addTypename={false}>
          <OfficesTab {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: true,
        error: undefined,
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error,
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error: undefined,
        dataTable: getDataTable(offices),
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('getDataTable', () => {
    it('should run correctly', () => {
      const dataTable = getDataTable(offices)
      expect(Array.isArray(dataTable)).toBe(true)
      expect(dataTable.length).toBe(4)
      expect(dataTable[0]).toEqual(tableHeaders)
    })
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import { Home, HomeProps, generateSection, renderSections } from '../home'

const props: HomeProps = {
  approvalsState: {
    loading: false,
    homeData: {}
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
}

describe('Home', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Home {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('renderSection', () => {
    it('should match snapshot', () => {
      const mockOnClick = jest.fn()
      const mockSections = [
        {
          title: 'Personal Details',
          isCompleted: false,
          onEdit: mockOnClick,
          buttonText: 'Edit'
        },
        {
          title: 'Primary ID',
          isCompleted: false,
          onEdit: mockOnClick,
          buttonText: 'Edit'
        }
      ]
      const component = renderSections(mockSections)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot', () => {
      const mockOnClick = jest.fn()
      const mockSections = [
        {
          title: 'Personal Details',
          isCompleted: false,
          onEdit: mockOnClick,
          buttonText: 'Edit'
        },
        {
          title: 'Primary ID',
          isCompleted: false,
          onEdit: mockOnClick,
          buttonText: 'Edit'
        }
      ]
      const component = renderSections(mockSections)
      expect(component).toHaveLength(2)
    })
  })

  describe('generateSection', () => {
    it('should run correctly', () => {
      const mockOnClick = jest.fn()
      const result = generateSection(mockOnClick)
      expect(result).toHaveLength(7)
    })
  })
})

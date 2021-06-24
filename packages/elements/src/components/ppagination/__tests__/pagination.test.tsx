import React from 'react'
import { shallow } from 'enzyme'
import { PaginationWrap, PaginationText, PaginationButton, Pagination } from '../index'

describe('PaginationWrap', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <PaginationWrap>
        <div>I am a child</div>
      </PaginationWrap>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('PaginationText', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <PaginationText>
        <div>I am a child</div>
      </PaginationText>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('PaginationButton', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <PaginationButton>
        <div>I am a child</div>
      </PaginationButton>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Pagination', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Pagination callback={jest.fn()} currentPage={2} numberPages={4} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should callback onClick correctly', () => {
    const mockCallback = jest.fn()
    const wrapper = shallow(<Pagination callback={mockCallback} currentPage={2} numberPages={4} />)
    const buttons = wrapper.find(PaginationButton)

    buttons.first().simulate('click')

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenLastCalledWith(1)

    buttons.at(1).simulate('click')

    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback).toHaveBeenLastCalledWith(3)
  })
})

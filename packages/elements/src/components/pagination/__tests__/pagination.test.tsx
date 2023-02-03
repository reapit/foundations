import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  PaginationWrap,
  PaginationText,
  PaginationButton,
  Pagination,
  handlePageChange,
  handlePageInputChange,
} from '../index'

describe('PaginationWrap', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <PaginationWrap>
        <div>I am a child</div>
      </PaginationWrap>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('PaginationText', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <PaginationText>
        <div>I am a child</div>
      </PaginationText>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('PaginationButton', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <PaginationButton>
        <div>I am a child</div>
      </PaginationButton>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Pagination', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Pagination callback={jest.fn()} currentPage={2} numberPages={4} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with start end buttons', () => {
    const wrapper = render(
      <Pagination callback={jest.fn()} currentPage={2} numberPages={4} hasStartButton hasEndButton />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should callback onClick correctly', async () => {
    const mockCallback = jest.fn()

    const wrapper = render(<Pagination callback={mockCallback} currentPage={2} numberPages={4} />)

    fireEvent.click(wrapper.getByTestId('back-button'))

    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback).toHaveBeenLastCalledWith(1)

    fireEvent.click(wrapper.getByTestId('forward-button'))

    expect(mockCallback).toHaveBeenCalledTimes(4)
    expect(mockCallback).toHaveBeenLastCalledWith(3)
  })
})

describe('handlePageChange', () => {
  it('should correctly call the callback on change', () => {
    const nextPage = 2
    const callback = jest.fn()
    const setInputValue = jest.fn()
    const curried = handlePageChange(nextPage, callback, setInputValue)

    curried()

    expect(callback).toHaveBeenCalledWith(nextPage)
    expect(setInputValue).toHaveBeenCalledWith(String(nextPage))
  })
})

describe('handlePageInputChange', () => {
  it('should correctly call the callback on change', () => {
    const numberPages = 3
    const currentPage = 2
    const inputValue = '3'
    const callback = jest.fn()
    const curried = handlePageInputChange(numberPages, currentPage, inputValue, callback)

    curried()

    expect(callback).toHaveBeenCalledWith(Number(inputValue))
  })
})

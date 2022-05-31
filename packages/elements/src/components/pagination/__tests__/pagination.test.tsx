import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import { PaginationWrap, PaginationText, PaginationButton, Pagination } from '../index'

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

  it('should callback onClick correctly', async () => {
    const mockCallback = jest.fn()
    const user = userEvent.setup()

    render(<Pagination callback={mockCallback} currentPage={2} numberPages={4} />)

    await user.click(screen.getByTestId('back-button'))

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenLastCalledWith(1)

    await user.click(screen.getByTestId('forward-button'))

    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(mockCallback).toHaveBeenLastCalledWith(3)
  })
})

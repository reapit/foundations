import * as React from 'react'
import { render } from '../../../tests/react-testing'
import IconButton from '../'

describe('IconButton component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<IconButton icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when disabled', () => {
    const wrapper = render(<IconButton disabled icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when in dark mode', () => {
    const wrapper = render(<IconButton dark icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger an onClick prop when clicked', () => {
    const onClick = jest.fn()
    const wrapper = render(<IconButton icon="add" onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import { Tile } from '../index'

describe('Tile', () => {
  it('should match snapshot when HIGHTLIGHT false', () => {
    const mockProps = {
      heading: 'mockHeading',
      hightlight: false,
    }
    const wrapper = render(
      <Tile {...mockProps}>
        <div>City</div>
        <div>Country</div>
        <div>PostalCode</div>
        <div>contactPerson</div>
      </Tile>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when HIGHTLIGHT true', () => {
    const mockProps = {
      heading: 'mockHeading',
      hightlight: true,
    }
    const wrapper = render(
      <Tile {...mockProps}>
        <div>City</div>
        <div>Country</div>
        <div>PostalCode</div>
        <div>contactPerson</div>
      </Tile>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

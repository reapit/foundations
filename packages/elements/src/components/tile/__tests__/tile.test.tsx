import React from 'react'
import { render } from '@testing-library/react'
import { Tile } from '..'

describe('Tile component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Tile paddingSize="small">Some Content</Tile>)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import GraphQLPage from '..'
import { render } from '../../../tests/react-testing'

describe('GraphQLPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<GraphQLPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
